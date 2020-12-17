import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { ApolloAngularSDK, Exact } from '../../sdk/generated/graphql';
import { NavigateService } from '../../shared/navigate.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit, OnDestroy {
  subSink: Subscription;
  searchInput = new FormControl(null, { updateOn: 'change' });
  filteredOptions: Observable<any[]>;
  navigatePath: string = '/company/company-info/';

  constructor(
    private apolloSdk: ApolloAngularSDK,
    public _navigate: NavigateService
  ) { }

  ngOnInit() {
    this.subSink = new Subscription();

    this.filteredOptions = of([]);
  }

  onSelect(symbol: string) {
    this.clearSearch();
    this._navigate.navigate(`${this.navigatePath}${symbol}`);
  }

  clearSearch(): void {
    this.searchInput.reset();
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
