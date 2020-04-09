import { TestBed } from '@angular/core/testing';

import { PlayerGqlService } from './player-gql.service';

describe('PlayerGqlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerGqlService = TestBed.get(PlayerGqlService);
    expect(service).toBeTruthy();
  });
});
