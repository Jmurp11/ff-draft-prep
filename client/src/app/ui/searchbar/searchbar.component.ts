import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { ApolloAngularSDK, Exact, PlayerArgs } from '../../sdk/generated/graphql';
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
  navigatePath: string = '/players/';

  constructor(
    private apolloSdk: ApolloAngularSDK,
    public _navigate: NavigateService
  ) { }

  ngOnInit() {
    this.subSink = new Subscription();

    this.filteredOptions = this.searchInput
      .valueChanges
      .pipe(
        debounceTime(500)
      )
      .pipe(
        startWith(''),
        switchMap(value => {
          const searchInput: PlayerArgs = {
            filterType: 'byName',
            lastName: value
          };

          if (value && value.length > 0) {
            return this.apolloSdk.playersWatch({ data: searchInput })
              .valueChanges
              .pipe(
                map(res => {
                  return res.data.players;
                }
                )
              );
          } else {
            return of([]);
          }
        })
      );;
  }

  onSelect(player: string) {
    this._navigate.navigate(`${this.navigatePath}${player}`);
    this.clearSearch();
  }

  clearSearch(): void {
    this.searchInput.reset();
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
