import { TestBed } from '@angular/core/testing';

import { FilteredDataService } from './filtered-data.service';

describe('FilteredDataService', () => {
  let service: FilteredDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilteredDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
