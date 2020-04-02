
import { Component, Inject, OnInit, Optional, ViewEncapsulation, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {ProfileService} from '../profile.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ThrowStmt } from '@angular/compiler';
import { CropperPosition } from 'ngx-image-cropper';

@Component({
  selector: 'app-add-photo-dialog',
  templateUrl: './add-photo-dialog.component.html',
  styleUrls: ['./add-photo-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddPhotoDialogComponent implements OnInit {

  public photoForm: FormGroup;
  public base64Image: any;
  private landshaftImage: any;
  private current_image_position_squere: any;
  private current_cropper_position_squere: any;

  croperPosition_square: CropperPosition = {x1:0, y1: 0, x2: 0, y2: 0};

  imageChangedEvent: any = '';
  croppedImage: any = '';


  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddPhotoDialogComponent>,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private _snackBar: MatSnackBar
  ) {
    this.photoForm = this.fb.group({
      image: [null],
      header: [''],
      description: [''],
      geolocation: [''],
      role_media: [''],
      price: ['']
    });

    this.photoForm.get('price').disable();
  }

  ngOnInit() {
    this.base64Image = this.data;
    this.profileService.getLocation().subscribe(rez => {
      if (rez.status === 1) {
        this.photoForm.get('geolocation').setValue('undefined');
      } else {
        this.photoForm.get('geolocation').setValue(`${rez.country}, ${rez.city}`);
      }
    });
  }



  public publicationChanged(): void {
    // if (this.photoForm.get('role_media').value === 'private') {
    //   this.photoForm.get('price').enable();
    // } else {
    //   this.photoForm.get('price').disable();
    //   this.photoForm.get('price').reset();
    // }
  }

  public imageCroppedSquere(event: ImageCroppedEvent): void {
    this.landshaftImage = event.base64;
    // this.photoForm.get('image').setValue(this.landshaftImage);
    this.current_image_position_squere = event.imagePosition;
    this.current_cropper_position_squere = event.cropperPosition;
  }


  public onSave(): void {
    if (!this.photoForm.invalid) {
      let data = this.photoForm.value;
      data.img_pos = this.current_image_position_squere;
      data.crop_pos = this.current_cropper_position_squere;
      data.image = this.base64Image;
      this.profileService.savePhoto(data).subscribe((res => {
        this.openSnackBar(res.message, 'ok');
        this.dialogRef.close();
        this.profileService.photoUploaded$.next(true);
      }));
    }

  }

  public dialogClose(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
