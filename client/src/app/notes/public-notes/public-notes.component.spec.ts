import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNotesComponent } from './public-notes.component';

describe('PublicNotesComponent', () => {
  let component: PublicNotesComponent;
  let fixture: ComponentFixture<PublicNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
