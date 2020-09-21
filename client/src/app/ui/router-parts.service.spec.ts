import { TestBed } from '@angular/core/testing';

import { RouterPartsService } from './router-parts.service';

describe('RouterPartsService', () => {
  let service: RouterPartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterPartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
