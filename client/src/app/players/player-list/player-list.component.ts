import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatchMediaService } from '../../ui/match-media.service';
import { FilteredDataService } from '../player-filter/filtered-data.service';
import { LoadingService } from 'src/app/shared/loading-spinner/loading.service';
import { SearchVisibleService } from '../search-visible.service';
import { switchMap } from 'rxjs/operators';

enum WindowHeightTargetPercent {
  xl = .65,
  lg = .63,
  md = .55,
  sm = .50,
  xs = .45
}

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  subSink: Subscription;
  visiblePlayers$: Observable<any[]>;
  showLoadingSpinner$: Observable<boolean>;
  mainDivHeight: number;
  pageStartingIndex: number = 0;
  pageEndingIndex: number = 15;
  pageSizeOptions: Array<number> = [15, 30, 45, 60, 75];
  isSearchVisible: boolean;

  @ViewChild('scrollable') scrollable: ElementRef;

  constructor(
    private filteredData: FilteredDataService,
    private loadingService: LoadingService,
    private searchVisible: SearchVisibleService,
    private matchMedia: MatchMediaService
  ) { }

  ngOnInit(): void {
    this.subSink = new Subscription();

    this.subSink.add(
      this.searchVisible.isSearchVisible
        .pipe(
          switchMap(visible => {
            this.isSearchVisible = visible;
            return this.matchMedia.windowHeight
          })
        ).subscribe(res => {
          this.mainDivHeight = this.setCardListHeight(res, this.isSearchVisible);
        }));

    this.showLoadingSpinner$ = this.loadingService.isLoading;

    this.visiblePlayers$ = this.filteredData.data;
  }

  setCardListHeight(windowSize: number, isSearchVisible: boolean) {
    const windowAlias = this.matchMedia.getWindowHeightType(windowSize);
    if (windowAlias) {
      if (isSearchVisible) {
        return WindowHeightTargetPercent[windowAlias.alias] * 100;
      } else {
        return (WindowHeightTargetPercent[windowAlias.alias] + .07) * 100;
      }
    }
  }

  onPaginateChange(event) {
    this.pageStartingIndex = (event.pageIndex * event.pageSize);
    this.pageEndingIndex = (event.pageIndex * event.pageSize) + event.pageSize;
  }

  scrollToTop() {
    this.scrollable.nativeElement.scrollTop = 0;
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }
}
