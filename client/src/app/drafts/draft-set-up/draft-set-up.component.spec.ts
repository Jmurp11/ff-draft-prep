import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftSetUpComponent } from './draft-set-up.component';

describe('DraftSetUpComponent', () => {
  let component: DraftSetUpComponent;
  let fixture: ComponentFixture<DraftSetUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftSetUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftSetUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
