import { TestBed } from '@angular/core/testing';

import { SearchVisibleService } from './search-visible.service';

describe('SearchVisibleService', () => {
  let service: SearchVisibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchVisibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
