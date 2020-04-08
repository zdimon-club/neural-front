import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineSideComponent } from './online-side.component';

describe('OnlineSideComponent', () => {
  let component: OnlineSideComponent;
  let fixture: ComponentFixture<OnlineSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
