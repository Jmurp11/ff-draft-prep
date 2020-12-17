import { Pipe } from '@angular/core';


export interface ActionColumnInfo {
  propName: string,
  matIcon: string,
  func: (...args: any[]) => void;
}

export interface ColumnInfo {
  propName: string;
  displayValue: string;
  pipe?: Pipe | null;
  pipeArgs?: number[] | string[] | null;
  overrideExpression?: (...args: any[]) => any;
  additionalDisplayContent?: string;
  cellClass?: (...args: any[]) => string;
  cellStyle?: (...args: any[]) => string;
}

export interface HeightSizesInfo {
  truncateHeightAtDataLength: number;
  truncatedMinimumHeight: number;
  perItemTruncatedHeightModifier?: number
  fullHeight: number;
  useWindowHeightAutoResize?: boolean;
}

export interface TableConfig {
  dataSet: any[];
  columnsToDisplay?: ColumnInfo[];
  actionColumns?: ActionColumnInfo[];
  rowClick?: (...args: any[]) => any;
  pageDefaultSize: number;
  heightSizes?: HeightSizesInfo;
  useColumnSelector?: boolean;
  localStorageSetting?: string;
  firstColumnSticky?: boolean;
}
