import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
// services
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector     : 'app-feed-show-video-dialog',
    template  : `<video style="width: 100%" [src]="data.video.get_video_url" controls>
            Your browser does not support the video tag.
     </video>`
})
export class ShowVideoComponent implements OnInit {


    image_data: any;


    constructor(
        public dialogRef: MatDialogRef<ShowVideoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }


    ngOnInit(): void {

    }




}

