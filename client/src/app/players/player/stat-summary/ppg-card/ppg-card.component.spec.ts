import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpgCardComponent } from './ppg-card.component';

describe('PpgCardComponent', () => {
  let component: PpgCardComponent;
  let fixture: ComponentFixture<PpgCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpgCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
