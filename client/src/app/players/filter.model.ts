export interface Filter {
  id: number;
  type: FilterType;
  value: any;
  mode: FilterMode;
}

export interface FilterType {
  displayName: string;
  propertyName: string;
}

export enum SearchFilters {
  any = 'field',
  name = 'name',
  team = 'team',
  position = 'position'
}

export enum FilterMode {
  And = 'All',
  Or = 'Any',
  Except = 'Except'
}
