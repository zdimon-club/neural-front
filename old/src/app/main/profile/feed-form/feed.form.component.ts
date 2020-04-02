import { FeedService } from './../../feed/feed.service';
import { RegistrationService } from './../../registration/registration.service';
import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileService } from './../profile.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageService } from '../../../core/services/image.service';
import { AddPhotoDialogComponent } from '../add-photo-dialog/add-photo-dialog.component';
import { MatDialog } from '@angular/material';
import { PhotoCameraDialogComponent } from '../../../core/components/dialogs/photo.camera.component';
import { VideoCameraDialogComponent } from 'src/app/core/components/dialogs/video.camera.component';
import { ShowVideoComponent } from '../../../core/components/dialogs/show-video.component';


@Component({
  selector: 'app-feed-form',
  templateUrl: './feed-form.component.html',
  styleUrls: ['./feed-form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedFormComponent implements OnInit {

  @Input() user;
  @Output() saved = new EventEmitter();
  @Output() changePage = new EventEmitter();
  form: FormGroup;
  form_data: any;

  public image1 = '';
  public image2 = '';
  public image3 = '';
  public image4 = '';

  public video1: any;
  public video2: any;
  public video3: any;
  public video4: any;


  formToSave = new FormData();


  constructor(
    private profile_service: ProfileService,
    private fb: FormBuilder,
    private registration_service: RegistrationService,
    private imageService: ImageService,
    private feed_service: FeedService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      cameraImages: this.fb.array([]),
      cameraVideo: this.fb.array([]),
      image1: [''],
      image2: [''],
      image3: [''],
      image4: [''],
      video1: [''],
      video2: [''],
      video3: [''],
      video4: [''],
      is_stories: [true],
    });
  }

  get cameraImages(): AbstractControl {
    return this.form.get('cameraImages');
  }

  get cameraVideo(): AbstractControl {
    return this.form.get('cameraVideo');
  }

  public onFileChange(event, type): void {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.imageService.getBase64(file).subscribe(data => {
        if (type === 'image1') {
          this.image1 = data;
        }
        if (type === 'image2') {
          this.image2 = data;
        }
        if (type === 'image3') {
          this.image3 = data;
        }
        if (type === 'image4') {
          this.image4 = data;
        }

        if (type === 'video1') {
          this.video1 = {};
          this.video1.name = event.target.value;
          this.video1.file = event.target.files[0];
        }
        if (type === 'video2') {
          this.video2 = {};
          this.video2.name = event.target.value;
          this.video2.file = event.target.files[0];
        }
        if (type === 'video3') {
          this.video3 = {};
          this.video3.name = event.target.value;
          this.video3.file = event.target.files[0];
        }
        if (type === 'video4') {
          this.video4 = {};
          this.video4.name = event.target.value;
          this.video4.file = event.target.files[0];
        }

      });
    }
  }

  public deleteImg(type: string): void {
    if (type === 'image1') {
      this.image1 = '';
    }
    if (type === 'image2') {
      this.image2 = '';
    }
    if (type === 'image3') {
      this.image3 = '';
    }
    if (type === 'image4') {
      this.image4 = '';
    }

    if (type === 'video1') {
      this.video1.name = '';

    }
    if (type === 'video2') {
      this.video2.name = '';

    }
    if (type === 'video3') {

    }
    if (type === 'video4') {
      this.video4.name = '';

    }
  }

  takeCameraPhoto() {
    this.dialog.open(PhotoCameraDialogComponent).afterClosed().subscribe((dataURL: string) => {
      if (dataURL) {
        this.cameraImages.value.push(dataURL);
      }
    });
  }

  takeCameraVideo() {
    this.dialog.open(VideoCameraDialogComponent).afterClosed().subscribe((blob: Blob) => {
      if (blob) {
        this.cameraVideo.value.push(blob);
      }
    });
  }

  deleteCameraItem(cameraItems: [], i: number) {
    cameraItems.splice(i, 1);
  }

  onSubmit() {
    this.formToSave.append('title', this.form.get('title').value);
    this.formToSave.append('description', this.form.get('description').value);

    this.cameraImages.value.forEach((data, i) => {
      this.formToSave.append(`cameraImage${i}`, data);
    });

    this.cameraVideo.value.forEach((data, i) => {
      this.formToSave.append(`cameraVideo${i}`, data);
    });

    this.formToSave.append('image1', this.image1);
    this.formToSave.append('image2', this.image2);
    this.formToSave.append('image3', this.image3);
    this.formToSave.append('image4', this.image4);

    try {
      this.formToSave.append('video1', this.video1.file, this.video1.name);
      this.formToSave.append('video2', this.video2.file, this.video2.name);
      this.formToSave.append('video3', this.video3.file, this.video3.name);
      this.formToSave.append('video4', this.video4.file, this.video4.name);
    } catch {
      console.log('error');
    }

    this.formToSave.append('is_stories', this.form.get('is_stories').value);


    this.feed_service.addFeed(this.formToSave).subscribe(data => {
      this.saved.emit(data);
    });
  }

}
