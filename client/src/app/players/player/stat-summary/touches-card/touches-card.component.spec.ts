import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchesCardComponent } from './touches-card.component';

describe('TouchesCardComponent', () => {
  let component: TouchesCardComponent;
  let fixture: ComponentFixture<TouchesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouchesCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouchesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
