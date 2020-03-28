import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftLobbyComponent } from './draft-lobby.component';

describe('DraftLobbyComponent', () => {
  let component: DraftLobbyComponent;
  let fixture: ComponentFixture<DraftLobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftLobbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
