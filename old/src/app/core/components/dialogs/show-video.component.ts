import { Component, Input, ViewChild } from '@angular/core';


@Component({
  selector: 'app-show-video',
  template: `
    <video #hardwareVideo width="200px" height="100%" controls>
      Your browser does not support the video tag.
    </video>`,
})
export class ShowVideoComponent {
  @ViewChild('hardwareVideo', { static: true }) hardwareVideo: any;

  @Input() set blob(blob: Blob) {
    this.hardwareVideo.nativeElement.src = URL.createObjectURL(blob);
  }
}
