import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineItemComponent } from './online-item.component';

describe('OnlineItemComponent', () => {
  let component: OnlineItemComponent;
  let fixture: ComponentFixture<OnlineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
