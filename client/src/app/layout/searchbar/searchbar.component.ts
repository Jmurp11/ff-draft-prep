import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnChanges {

  @Input()
  searchTypeInput: boolean;

  @Input()
  resultsInput: any;

  searchBar: FormControl;
  results: any;
  filteredOptions: Observable<any[]>;
  searchVal: string;
  searchType: boolean;

  constructor(
    private _layout: LayoutService,
    private router: Router
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.results = [];
    this.searchType = true;
    this.searchBar = new FormControl();

    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'resultsInput': {
            this.results = this.resultsInput;
            this.filteredOptions = this.searchBar.valueChanges
              .pipe(
                startWith(''),
                filter(value => value !== null),
                map(value => this._filter(value, this.searchType))
              );
            break;
          }
          case 'searchTypeInput': {
            this.searchType = this.searchTypeInput;
            break;
          }
        }
      }
    }
  }

  private _filter(value: string, searchType: boolean): string[] {
    let filterValue = '';
    if (value) {
      if (searchType) {
        if (typeof value === 'string') {
          filterValue = value.toLowerCase();
        }

        return this.results.filter(result => result.username.toLowerCase().includes(filterValue));
      } else {
        if (typeof value === 'string') {
          filterValue = value.toLowerCase();
        }

        return this.results.filter(result => result.name.toLowerCase().includes(filterValue));
      }
    }
  }

  navigate(object: any) {
    this.clearSearch();

    if (this.searchType) {
      return this.router.navigate([`./u/profile/${object.username}`]);
    } else {
      return this.router.navigate([`./d/player/${object.id}`]);
    }
  }

  clearSearch() {
    this._layout.setIsSearchActive(false);
    this.searchBar.reset();
  }
}
