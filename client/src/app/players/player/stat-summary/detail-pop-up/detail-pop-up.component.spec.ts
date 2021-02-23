import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPopUpComponent } from './detail-pop-up.component';

describe('DetailPopUpComponent', () => {
  let component: DetailPopUpComponent;
  let fixture: ComponentFixture<DetailPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
