import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { StreamManager } from 'openvidu-browser';

@Component({
    selector: 'app-ov-video',
    template: '<video #videoElement></video>',
    styles: [`
       video {
           width: 100%;
           height: 100%;
           object-fit: cover;
       }
    `]
})
export class OpenViduVideoComponent implements AfterViewInit {

    @ViewChild('videoElement', { static: false }) elementRef: ElementRef;

    _streamManager: StreamManager;

    ngAfterViewInit() {
        this._streamManager.addVideoElement(this.elementRef.nativeElement);
    }

    @Input()
    set streamManager(streamManager: StreamManager) {
        this._streamManager = streamManager;
        if (!!this.elementRef) {
            this._streamManager.addVideoElement(this.elementRef.nativeElement);
        }
    }

}
