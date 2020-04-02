import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Card } from './Card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('cardState', [
      state(
        'close',
        style({
          width: '0px',
          overflow: 'hidden',
        }),
      ),
      state(
        'open',
        style({
          width: '*',
          overflow: 'hidden',
        }),
      ),
      transition('* => *', animate('1s  ease-in-out')),
    ]),
  ],
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Output() eventClick = new EventEmitter();
  status_cover: string;
  status_face: string;

  constructor() {}

  ngOnInit() {
    // console.log(this.$(this));
    // this.toastr.alert('sss','ddddd');
  }

  @HostListener('click', ['$event.target']) flipOver(crd) {
    this.card.isHidden = !this.card.isHidden;
    if (this.card.isHidden) {
      this.status_cover = 'open';
      this.status_face = 'close';
    } else {
      this.status_cover = 'close';
      this.status_face = 'open';
    }

    this.eventClick.emit(this.card);
  }
}
