import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FilteredDataService } from '../filtered-data.service';
import { PanelStateService } from '../panel-state.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  displayData$: Observable<any[]>;
  scoringTypes: string[];
  scoringType: string;
  pageStartingIndex = 0;
  pageEndingIndex = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];
  defaultPageSize = 10;
  panelState$: Observable<boolean>;

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  constructor(
    private filteredData: FilteredDataService,
    private panelState: PanelStateService
  ) { }

  ngOnInit(): void {
    this.displayData$ = this.filteredData.data;
    this.panelState$ = this.panelState.panelState;
  }
}
