import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetShareCardComponent } from './target-share-card.component';

describe('TargetShareCardComponent', () => {
  let component: TargetShareCardComponent;
  let fixture: ComponentFixture<TargetShareCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetShareCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetShareCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
