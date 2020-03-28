import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockDraftComponent } from './mock-draft.component';

describe('MockDraftComponent', () => {
  let component: MockDraftComponent;
  let fixture: ComponentFixture<MockDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
