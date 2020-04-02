import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-uploaded-photo',
  templateUrl: './uploaded-photo.component.html',
  styleUrls: ['./uploaded-photo.component.scss']
})
export class UploadedPhotoComponent implements OnInit {

  @Input() mainPhoto;

  constructor() { }

  ngOnInit() {
  }

}
