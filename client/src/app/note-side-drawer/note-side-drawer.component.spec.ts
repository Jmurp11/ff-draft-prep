import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSideDrawerComponent } from './note-side-drawer.component';

describe('NoteSideDrawerComponent', () => {
  let component: NoteSideDrawerComponent;
  let fixture: ComponentFixture<NoteSideDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteSideDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteSideDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
