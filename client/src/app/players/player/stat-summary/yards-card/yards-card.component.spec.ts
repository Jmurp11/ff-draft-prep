import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardsCardComponent } from './yards-card.component';

describe('YardsCardComponent', () => {
  let component: YardsCardComponent;
  let fixture: ComponentFixture<YardsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
