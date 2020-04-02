

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ImageService } from './../../../core/services/image.service';
import { FeedService } from './../feed.service';
import { FeedModel } from './../store/feed.store';
import { PhotoCameraDialogComponent } from './camera/photo.camera.component';
import { ShowVideoComponent } from './camera/show.video.component';
import { VideoCameraDialogComponent } from './camera/video.camera.component';




@Component({
    selector     : 'app-feed-add',
    templateUrl  : './edit.feed.component.html',
    styleUrls    : ['./edit.feed.component.scss']
})
export class EditFeedComponent implements OnInit, OnDestroy {

    // Private
    private _unsubscribeAll: Subject<any>;

    public form: FormGroup;
    pageType: string;
    feed: any;
    images: any[] = [];
    cam_images: any[] = [];
    videos: any = [];
    cam_videos: any = [];
    ready_to_save = false;


    constructor(
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
        private feed_service: FeedService,
        private image_service: ImageService,
        private _matSnackBar: MatSnackBar,
    ) {
        this._unsubscribeAll = new Subject();

        this.feed_service.onVideoRecorded
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data: any) => {
            const it = {name: Date.now().toString() + '.mp4', data};
            this.cam_videos.push(it);
            this.ready_to_save = true;
        });


        this.feed_service.onPhotoRecorded
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data: any) => {
            this.cam_images.push(data);
            this.ready_to_save = true;
        });

    }


    ngOnInit(): void {
        this.feed_service.onFeedChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe( (feed) => {
                if (feed) {
                    this.feed = feed;
                    this.pageType = 'edit';
                } else {
                    this.pageType = 'new';
                    this.feed = new FeedModel();
                }
                this.form = this.createFeedForm();
            }
        );

    }

    createFeedForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.feed.id],
            title: [this.feed.title, [Validators.required]],
            text: [this.feed.text],

        });
    }

    onImageChanged(event: any) {
        const image = event.target.files[0];
        this.image_service.getBase64fromFile(image)
        .then((img) => {
            this.images.push({name: event.target.files[0].name, data: img});
            // console.log(this.images);
            this.ready_to_save = true;
        });
    }

    onVideoChanged(event: any) {
        const video = event.target.files[0];
        // formData.append('video', video, video.name);
        this.videos.push(video);
        // console.log(this.videos);
        this.ready_to_save = true;
    }

    saveFeed(): void {
        const data = this.form.getRawValue();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('text', data.text);
        formData.append('id', data.id);
        formData.append('images', JSON.stringify(this.images));
        formData.append('cam_images', JSON.stringify(this.cam_images));

        /// video from comp
        for (const v of this.videos) {
            formData.append('video[]', v , v.name);
        }

        /// video from cam
        for (const v of this.cam_videos) {
            formData.append('cam_video[]', v.data , v.name);
        }

        // data['images'] = this.images;
        // data['videos'] = this.videos;

        this.feed_service.saveFeed(formData).then((res: any) => {
            this.feed_service.onFeedChanged.next(res);
            this.images = [];
            this.videos = [];
            this.cam_videos = [];
            this.cam_images = [];
            this.ready_to_save = false;
            // Show the success message
            this._matSnackBar.open('Feed saved', 'OK', {
                verticalPosition: 'top',
                duration        : 2000
            });
        });
    }

    addImgFromCam() {
        const dialogRef = this.dialog.open(PhotoCameraDialogComponent, {
            width: '450px',
            data: {name: 'dima'}
          });
    }

    addVideoFromCam() {
        const dialogRef = this.dialog.open(VideoCameraDialogComponent, {
            width: '450px',
            data: {name: 'dima'}
          });
    }

    showVideo(video: any) {
        const dialogRef = this.dialog.open(ShowVideoComponent, {
            width: '600px',
            data: {video}
          });
    }

    ngOnDestroy() {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
