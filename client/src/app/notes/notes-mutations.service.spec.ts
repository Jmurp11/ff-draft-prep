import { TestBed } from '@angular/core/testing';

import { NotesMutationsService } from './notes-mutations.service';

describe('NotesMutationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotesMutationsService = TestBed.get(NotesMutationsService);
    expect(service).toBeTruthy();
  });
});
