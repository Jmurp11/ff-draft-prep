import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionDataComponent } from './projection-data.component';

describe('ProjectionDataComponent', () => {
  let component: ProjectionDataComponent;
  let fixture: ComponentFixture<ProjectionDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
