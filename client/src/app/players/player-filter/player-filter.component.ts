import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SearchFilters, FilterMode, Filter, FilterType } from './filter.model';
import { debounceTime } from 'rxjs/operators';
import { FilterService } from './filter.service';
import { FilteredDataService } from './filtered-data.service';
import { PlayerStoreService } from '../player-store.service';
import { PlayerArgs, ApolloAngularSDK } from 'src/app/sdk/generated/graphql';
import { LoadingService } from 'src/app/shared/loading-spinner/loading.service';
import { SearchVisibleService } from '../search-visible.service';

@Component({
  selector: 'app-player-filter',
  templateUrl: './player-filter.component.html',
  styleUrls: ['./player-filter.component.scss']
})
export class PlayerFilterComponent implements OnInit, OnDestroy {
  subSink: Subscription;
  form: FormGroup;
  filteredOptions: Observable<any[]>;
  option: string;
  data: any[];
  visibleCards: any[];
  searchFilters = SearchFilters;
  filterModeOptions = FilterMode;
  scoringTypes: string[];
  scoringType: number;
  scoringTypeLabel: string;
  theEnd: boolean;
  batchSize = 300;
  teamProperty = 'team.fullName';
  selected: string;
  dataOptions: string[] = [
    `${new Date().getFullYear()} Projections`,
    `${new Date().getFullYear() - 1} Statistics`
  ];
  filters: Filter[] = [];
  filterTypeList: FilterType[] = [
    { displayName: this.searchFilters.any, propertyName: this.searchFilters.any },
    { displayName: this.searchFilters.name, propertyName: this.searchFilters.name },
    { displayName: this.searchFilters.position, propertyName: this.searchFilters.position },
    { displayName: this.searchFilters.team, propertyName: this.teamProperty }
  ];

  filterMode: FilterMode[] = [
    FilterMode.And,
    FilterMode.Or
  ];

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private loadingService: LoadingService,
    private filterService: FilterService,
    private filteredDataService: FilteredDataService,
    public searchVisible: SearchVisibleService,
    private playerStore: PlayerStoreService
  ) { }

  ngOnInit(): void {

    this.subSink = new Subscription();

    this.subSink.add(this.getPlayers()
      .subscribe(({ data, loading }) => {

        this.data = data.players;
        this.filteredDataService.setValue(this.data);
        this.loadingService.setValue(loading);
      }));

    this.scoringTypes = this.playerStore.getScoringTypes();

    this.scoringTypeLabel = this.scoringTypes[0];

    this.subSink.add(this.filterService.filterValue
      .subscribe(value => this._filter(value)));

    this.form = new FormGroup({
      searchBar: new FormControl(null, {
        updateOn: 'change',
      }),
      filterType: new FormControl(null, {
        updateOn: 'change'
      }),
      filterMode: new FormControl(null, {
        updateOn: 'change'
      }),
      displayData: new FormControl(null, {
        updateOn: 'change'
      }),
      scoringType: new FormControl(null, {
        updateOn: 'change'
      })
    });


    this.form.get('filterType').setValue(this.filterTypeList[0]);
    this.form.get('filterMode').setValue(this.filterModeOptions.And);

    this.subSink.add(
      this.form.get('searchBar')
        .valueChanges
        .pipe(
          debounceTime(10)
        )
        .subscribe(value => {
          this.filterService.removeTypedFilter();
          if (value === '') {
            value = null;
            this.filterService.removeTypedFilter();
            this.filteredDataService.setValue(this.visibleCards);
          } else {
            const userCreatingFilter: Filter = {
              id: -1,
              type: (this.form.get('filterType').value as FilterType),
              value,
              mode: (this.form.get('filterMode').value as FilterMode)
            };
            this.filterService.setFilterValue(userCreatingFilter);
          }
        }));

    this.subSink.add(
      this.form.get('filterType')
        .valueChanges
        .subscribe(() => {
          this.form.get('searchBar').setValue(this.form.get('searchBar').value);
        }));

    this.form.get('scoringType')
      .valueChanges
      .subscribe(val => {
        this.scoringTypeLabel = this.scoringTypes[val];
        this.playerStore.updateScoringType(this.scoringTypes[val]);
      });
  }

  getPlayers() {
    const playersInput: PlayerArgs = {
      filterType: 'byNotStatus',
      status: 'Inactive'
    };

    return this.apolloSdk.playersWatch({
      data: playersInput
    })
      .valueChanges;
  }

  clear(): void {
    this.form.reset();
  }

  applyFilter() {
    const newFilter: Filter = {
      id: this.filters.length,
      type: this.form.get('filterType').value,
      value: this.form.get('searchBar').value,
      mode: this.form.get('filterMode').value
    };

    this.filters.push(newFilter);
    this.filterService.removeTypedFilter();
    this.filterService.setFilterValue(newFilter);
    this.form.get('searchBar').setValue('');

    if (this.filters.length > 0 && this.filterMode.indexOf(FilterMode.Except) < 0) {
      this.filterMode.push(FilterMode.Except);
    }
  }

  removeFilter(item) {
    const index = this.filters.indexOf(item);

    if (index >= 0) {
      this.filters.splice(index, 1);
    }
    this.filterService.removeFilter(item);

    if (this.filters.length > 0) {
      if (this.filters[0].mode === this.filterModeOptions.Except) {
        this.filterService.removeFilter(this.filters[0]);
        this.filters.splice(0, 1);
      }
      if (this.filters.every(f => f.mode === this.filterModeOptions.Except)) {
        this.filters = [];
      }
    }

    if (this.filters.length === 0) {
      const indexOfExcept = this.filterMode.indexOf(FilterMode.Except);
      this.filterMode.splice(indexOfExcept, 1);
      this.form.get('filterMode').setValue(this.filterModeOptions.And);
      this.visibleCards = this.data;

      this.filteredDataService.setValue(this.visibleCards);
    }
  }

  isFilterInvalid() {
    if (this.form.get('filterMode').value === this.filterModeOptions.Except && this.filters.length === 0) {
      return true;
    }

    const isSearBarBlank = !(this.form.get('searchBar').value as string);
    if (isSearBarBlank) {
      return true;
    }
    const filterExists = this.filters.find(filter => {
      return filter.type === (this.form.get('filterType').value as FilterType) && filter.value === this.form.get('searchBar').value &&
        filter.mode === this.form.get('filterMode').value;
    });

    return filterExists;
  }

  checkIncludesValue(filters: Filter[]) {
    if (filters.length === 0) {

      this.filteredDataService.setValue(this.visibleCards);
      return;
    }
    const filterOR = filters.filter(f => f.mode === FilterMode.Or);
    const filterAND = filters.filter(f => f.mode === FilterMode.And);
    const filterEXCEPT = filters.filter(f => f.mode === FilterMode.Except);

    if (this.data) {
      this.data.filter(card => {
        let doesCardContainANDFilter = false;
        let doesCardContainORFilter = false;
        let doesCardContainEXCEPTFilter = false;
        if (filterAND.length > 0) {
          doesCardContainANDFilter = [...filterAND].every(f => {
            return this.compareCardToFilter(card, f);
          });

        }
        if (filterOR.length > 0) {
          doesCardContainORFilter = [...filterOR].some(f => {
            return this.compareCardToFilter(card, f);
          });
        }
        if (filterEXCEPT.length > 0) {
          doesCardContainEXCEPTFilter = [...filterEXCEPT].some(f => {
            return this.compareCardToFilter(card, f);
          });
        }

        if ((doesCardContainANDFilter || doesCardContainORFilter) && !doesCardContainEXCEPTFilter && !this.visibleCards.includes(card)) {
          this.visibleCards.push(card);
        }

      });
    }

    this.visibleCards = this.visibleCards.sort((player1, player2) => {
      if (player1.averageDraftPosition && player2.averageDraftPosition) {
        return player1.averageDraftPosition - player2.averageDraftPosition;
      }
    });
    return this.filteredDataService.setValue(this.visibleCards);
  }

  _filter(filter: Filter[]) {
    if (filter && filter.length > 0) {
      this.visibleCards = [];
      this.checkIncludesValue(filter);
    } else {
      if (this.data) {
        this.visibleCards = this.data;
      }
    }
  }

  compareCardToFilter(card: any, filter: Filter) {
    if (filter.type.propertyName === SearchFilters.any) {
      return (card.name.toLowerCase().includes(filter.value) ||
        card.position.toLowerCase().includes(filter.value) ||
        card.team?.fullName.toLowerCase().includes(filter.value)
      );
    }

    return card[filter.type.propertyName].toLowerCase().includes(filter.value);
  }

  toggleSearchBar() {
    this.searchVisible.toggleValue();
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
