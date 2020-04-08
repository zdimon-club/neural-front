import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManRegComponent } from './man-reg.component';

describe('ManRegComponent', () => {
  let component: ManRegComponent;
  let fixture: ComponentFixture<ManRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
