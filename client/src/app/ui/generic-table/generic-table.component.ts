import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchMediaService } from '../match-media.service';
import { TableConfig, ColumnInfo, HeightSizesInfo } from './generic-table-config.model';

interface ColumnViewStatus {
  propName: string,
  columnDisplayName: string,
  isHidden: boolean;
}

interface localStorageKeys {
  columns?: string;
  tableExpansion?: string;
}

enum WindowHeightModifierInEm {
  xl = 3,
  lg = 3,
  md = 5,
  sm = 10,
  xs = 12
}
@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input()
  tableConfig: TableConfig;

  @Output()
  paginatorValue: EventEmitter<string> = new EventEmitter();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('scrollable') scrollable: ElementRef;

  wrappedTableDataSource = new MatTableDataSource();
  extractedCols: string[];
  tableScrollHeight: number;
  defaultDataSizeForPaginatorVisibility: number = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  columnHideState: ColumnViewStatus[];
  showColumnSelector: boolean = false;

  //TODO: create as config property
  isTableExpanded: boolean = true;

  localStorageKeys: localStorageKeys = {};

  tableHeight: Observable<number | null>;
  wrapperHeight: Observable<number | null>;

  constructor(private matchMedia: MatchMediaService) {
  }

  //TODO: clean this up so no hardcoded values needed
  private calculateComponentHeightInEm(windowHeight: number): number | null {
    const pxToEmConversionModifier = 20;
    const windowType = this.matchMedia.getWindowHeightType(windowHeight);

    if (windowType) {
      const newHeight = windowHeight / pxToEmConversionModifier - WindowHeightModifierInEm[windowType.alias];
      return newHeight;
    }

    return null;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.wrappedTableDataSource.sort = this.sort;
    }

    if (this.paginator) {
      this.wrappedTableDataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy() {
    this.tableConfig = null;
    this.extractedCols = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    //TODO: refactor into bite-sized functions
    if (changes['tableConfig']) {
      this.tableConfig = changes['tableConfig'].currentValue;
      if (this.tableConfig != null && this.tableConfig.dataSet != null && this.tableConfig.dataSet.length > 0) {
        this.wrappedTableDataSource.data = this.tableConfig.dataSet;

        this.buildDefaultColumnInfo();
      } else if (this.tableConfig != null && this.tableConfig.dataSet != null && this.tableConfig.dataSet.length === 0) {
        this.wrappedTableDataSource.data = [];
      }

      if (this.tableConfig && this.tableConfig.columnsToDisplay != null) {
        this.extractedCols = this.tableConfig.columnsToDisplay.map(res => res.propName);

        if (this.columnHideState == null) {
          this.columnHideState = this.tableConfig.columnsToDisplay.map(col => {
            return { propName: col.propName, columnDisplayName: col.displayValue, isHidden: false } as ColumnViewStatus;
          });
        }
      }
      if (this.tableConfig && this.tableConfig.actionColumns != null) {
        this.extractedCols = [...this.extractedCols, ...this.tableConfig.actionColumns.map(res => res.propName)];
      }

      if (this.wrappedTableDataSource.paginator) {
        this.wrappedTableDataSource.paginator.pageSize = this.tableConfig.pageDefaultSize;
        this.ngAfterViewInit();
      }

      if (this.tableConfig && this.tableConfig!.localStorageSetting != null) {
        this.localStorageKeys.columns = this.tableConfig!.localStorageSetting + '-columns';
        if (localStorage.getItem(this.localStorageKeys.columns)) {
          this.columnHideState = [...JSON.parse(localStorage.getItem(this.localStorageKeys.columns))] as ColumnViewStatus[];
        }

        this.localStorageKeys.tableExpansion = this.tableConfig!.localStorageSetting + '-expanded';
        if (localStorage.getItem(this.localStorageKeys.tableExpansion)) {
          this.isTableExpanded = JSON.parse(localStorage.getItem(this.localStorageKeys.tableExpansion));
        }
      }

      this.tableScrollHeight = this.getTableHeight(this.tableConfig);

      const defaultHeightModifierInEm = 5;
      this.wrapperHeight = this.matchMedia.windowHeight.pipe(
        map(res => {
          if (this.tableConfig && this.tableConfig!.heightSizes! && this.tableConfig!.heightSizes!.useWindowHeightAutoResize) {
            return this.calculateComponentHeightInEm(res);
          } else {
            return null;
          }
        })
      );

      if (this.tableConfig && this.tableConfig!.heightSizes! && this.tableConfig!.heightSizes!.useWindowHeightAutoResize) {
        this.tableHeight = this.wrapperHeight.pipe(
          map(res => {
            if (res) {
              const reduceTableHeightBy = 8;
              return res - reduceTableHeightBy;
            }
          })
        );
      } else {
        this.tableHeight = of(this.tableScrollHeight);
      }
    }
  }

  checkForOverrideExpression(column: ColumnInfo) {
    if (column.overrideExpression) {
      return (typeof column.overrideExpression) !== 'undefined';
    }
    return false;
  }

  callOverrideExpression(column: ColumnInfo, rowData) {
    return column.overrideExpression(rowData);
  }

  scrollToTop() {
    this.scrollable.nativeElement.scrollTop = 0;
  }


  private getTableHeight(tableConfig: TableConfig) {
    const defaultFullHeight = 25;

    if (!tableConfig || tableConfig === undefined || tableConfig === null || tableConfig.dataSet == null) {
      return defaultFullHeight;
    }
    const defaultTruncatedHeight = 10;
    const defaultTruncateDataAtLength = 5;
    const defaultHeightSizes: HeightSizesInfo = {
      fullHeight: defaultFullHeight,
      truncateHeightAtDataLength: defaultTruncateDataAtLength,
      truncatedMinimumHeight: defaultTruncatedHeight
    };

    if (tableConfig.heightSizes && tableConfig.heightSizes.fullHeight && tableConfig.heightSizes.truncateHeightAtDataLength && tableConfig.heightSizes.truncatedMinimumHeight) {
      return this.calculateHeight(tableConfig.dataSet.length, tableConfig.heightSizes);
    }

    return this.calculateHeight(tableConfig.dataSet.length, defaultHeightSizes);
  }

  // TODO: incorporate into calculation pageSize of table? Needs further investigation
  private calculateHeight(dataLength: number, heightSizes: HeightSizesInfo) {
    let heightModifier: number;
    if (heightSizes.perItemTruncatedHeightModifier == null) {
      heightModifier = 3;
    } else {
      heightModifier = heightSizes.perItemTruncatedHeightModifier;
    }

    if (dataLength <= heightSizes.truncateHeightAtDataLength) {
      const height = heightSizes.truncatedMinimumHeight + (dataLength - 1) * heightModifier;
      return height > heightSizes.fullHeight ? heightSizes.fullHeight : height;
    }

    return heightSizes.fullHeight;
  }

  private buildDefaultColumnInfo() {
    if (this.tableConfig.columnsToDisplay == null) {
      const columnsBasedOnKeys: ColumnInfo[] = [];
      (Object.keys(this.tableConfig.dataSet[0])).forEach(item => {
        if (item !== '__typename') {
          if (this.tableConfig.columnsToDisplay == null) {
            columnsBasedOnKeys.push({
              propName: item,
              displayValue: item
            });
          }
        }
      });
      this.tableConfig = { ...this.tableConfig, columnsToDisplay: columnsBasedOnKeys };
    }
  }

  paginatorChange(event: any) {
    this.paginatorValue.emit(event.pageSize.toString());
  }

  saveColumnSelector(event) {
    if (this.tableConfig && this.tableConfig!.localStorageSetting != null) {
      localStorage.setItem(this.localStorageKeys.columns, JSON.stringify(this.columnHideState))
    }
  }

  getColumnHideStatus(column: ColumnInfo) {
    return this.columnHideState.find(col => col.propName === column.propName).isHidden;
  }

  toggleColumnSelector() {
    this.showColumnSelector = !this.showColumnSelector;
  }

  toggleExpandTable() {
    this.isTableExpanded = !this.isTableExpanded;

    if (this.tableConfig && this.tableConfig!.localStorageSetting) {
      localStorage.setItem(this.localStorageKeys.tableExpansion, JSON.stringify(this.isTableExpanded));
    }
  }

  setColumnSticky(index: number) {
    const visibleColumns = this.columnHideState.filter(col => col.isHidden === false);

    if (visibleColumns.length < 1) {
      return null;
    }

    return index === this.columnHideState.indexOf(visibleColumns[0]);
  }
}
