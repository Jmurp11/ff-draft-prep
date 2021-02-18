import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassingCardComponent } from './passing-card.component';

describe('PassingCardComponent', () => {
  let component: PassingCardComponent;
  let fixture: ComponentFixture<PassingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
