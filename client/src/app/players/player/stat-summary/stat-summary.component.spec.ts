import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatSummaryComponent } from './stat-summary.component';

describe('StatSummaryComponent', () => {
  let component: StatSummaryComponent;
  let fixture: ComponentFixture<StatSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
