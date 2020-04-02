import { Component, Input, Output, OnInit, OnDestroy, ChangeDetectionStrategy, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-feed-popup-mobile-header',
  templateUrl: './mobile.header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MobileHeaderComponent implements OnInit, OnDestroy {

  @Input() feed: any;
  @Input() isAuth: boolean;
  @Output() subscribeEmmiter: EventEmitter<any> = new EventEmitter();


  constructor(
    
  ) {
  }

  emitSubscribe(feed) {
    const data = {value: true, feed};
    this.subscribeEmmiter.emit(data);
  }

  emitUnSubscribe(feed) {
    const data = {value: false, feed};
    this.subscribeEmmiter.emit(data);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
   
  }
}
