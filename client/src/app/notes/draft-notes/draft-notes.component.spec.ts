import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftNotesComponent } from './draft-notes.component';

describe('DraftNotesComponent', () => {
  let component: DraftNotesComponent;
  let fixture: ComponentFixture<DraftNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
