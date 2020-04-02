import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivChatComponent } from './priv-chat.component';

describe('PrivChatComponent', () => {
  let component: PrivChatComponent;
  let fixture: ComponentFixture<PrivChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
