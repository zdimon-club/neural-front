import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-core-widget-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserPhotoComponent implements OnInit {
  @Input() user: any;

  constructor() { }

  ngOnInit() {
  }

}
