


import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ImageCroppedEvent, CropperPosition } from 'ngx-image-cropper';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Observer} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

/// Store
import { Store } from '@ngrx/store';
import { VideoState } from './store/video.store';
import { selectVideoList } from './store/video.selector';
///////

// services
import { VideoService } from './video.service';

import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'app-photo-edit',
    templateUrl  : './detail.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class VideoDetailComponent implements OnInit
{
    video: any;
    // Private
    private _unsubscribeAll: Subject<any>;    
   

    constructor(
        private store: Store<VideoState>,
        private route: ActivatedRoute,
        private router: Router,
        private video_service: VideoService

    )
    {
      this._unsubscribeAll = new Subject();
    }

    
    ngOnInit(): void
    {
      
      this.video_service.detail(parseInt(this.route.snapshot.paramMap.get('id')))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.video = data;
      });
    }

    ngOnDestroy(){
        
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  

}

