import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-gallery-profile',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() gallery;

  isShowAll = false;

  constructor() { }

  ngOnInit() {

  }
}
