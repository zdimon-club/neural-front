
import { Component, Input, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-feed-popup',
  templateUrl: './feed.popup.component.html',
  styleUrls: ['./feed.popup.component.scss']
})
export class FeedPopupComponent implements OnInit {

  @Input() media;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data
  ) { }


  ngOnInit() {


  }
}
