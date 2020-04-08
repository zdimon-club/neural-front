import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomanRegComponent } from './woman-reg.component';

describe('WomanRegComponent', () => {
  let component: WomanRegComponent;
  let fixture: ComponentFixture<WomanRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomanRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomanRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
