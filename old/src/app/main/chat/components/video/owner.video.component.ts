
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { takeUntil, concatMap } from 'rxjs/operators';
import {fromEvent, Observable} from 'rxjs';


@Component({
  selector: 'app-chat-owner-video',
  templateUrl: './owner.video.component.html',
  styleUrls: ['./owner.video.component.css']
})
export class OwnerVideoComponent implements OnInit {

  @Input() publisher;
  @Input() is_loading;
  @Input() is_video;
  @Output() turn = new EventEmitter<boolean>();
  @ViewChild('dragDiv', {static: false}) dragDiv: ElementRef;

  dragDownStream$: Observable<any>;
  constructor(

  ) {

  }

  ngOnInit() {}

  // ngAfterViewInit() {
  //   const dragDownStream$ = fromEvent(this.dragDiv.nativeElement, 'mousedown');
  //   const dragUpStream$ = fromEvent(this.dragDiv.nativeElement, 'mouseup');
  //   const dragMoveStream$ = fromEvent(this.dragDiv.nativeElement, 'mousemove');
  //
  //   dragDownStream$.pipe(
  //     concatMap(() => {
  //       return dragMoveStream$.pipe(
  //         takeUntil(dragUpStream$),
  //       );
  //     }),
  //   ).subscribe((evt: any) => {
  //     console.log(evt);
  //     // console.log(this.dragDiv.nativeElement.style.left);
  //     // console.log(this.dragDiv.nativeElement.style.top);
  //     this.dragDiv.nativeElement.style.left = (evt.clientY) + 'px';
  //     this.dragDiv.nativeElement.style.top = (evt.clientX) + 'px';
  //   });
  // }
}
