import { TestBed } from '@angular/core/testing';

import { DraftStateService } from './draft-state.service';

describe('DraftStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DraftStateService = TestBed.get(DraftStateService);
    expect(service).toBeTruthy();
  });
});
