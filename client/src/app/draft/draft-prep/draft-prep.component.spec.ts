import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftPrepComponent } from './draft-prep.component';

describe('DraftPrepComponent', () => {
  let component: DraftPrepComponent;
  let fixture: ComponentFixture<DraftPrepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftPrepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftPrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
