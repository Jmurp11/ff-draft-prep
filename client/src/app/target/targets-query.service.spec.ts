import { TestBed } from '@angular/core/testing';

import { TargetsQueryService } from './targets-query.service';

describe('TargetsQueryService', () => {
  let service: TargetsQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TargetsQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
