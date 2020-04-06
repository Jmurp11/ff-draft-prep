import { TestBed } from '@angular/core/testing';

import { NotesQueriesService } from './notes-queries.service';

describe('NotesQueriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotesQueriesService = TestBed.get(NotesQueriesService);
    expect(service).toBeTruthy();
  });
});
