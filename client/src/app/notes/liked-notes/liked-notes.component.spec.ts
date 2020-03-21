import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedNotesComponent } from './liked-notes.component';

describe('LikedNotesComponent', () => {
  let component: LikedNotesComponent;
  let fixture: ComponentFixture<LikedNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
