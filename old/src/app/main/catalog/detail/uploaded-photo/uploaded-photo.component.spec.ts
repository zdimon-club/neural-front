import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedPhotoComponent } from './uploaded-photo.component';

describe('UploadedPhotoComponent', () => {
  let component: UploadedPhotoComponent;
  let fixture: ComponentFixture<UploadedPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
