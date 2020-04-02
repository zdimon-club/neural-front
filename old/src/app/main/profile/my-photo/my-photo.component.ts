import {Component, Input, OnInit} from '@angular/core';
import {UploadPhotoDialogComponent} from '../upload-photo-dialog/upload-photo-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-my-photo-profile',
  templateUrl: './my-photo.component.html',
  styleUrls: ['./my-photo.component.scss']
})
export class MyPhotoComponent implements OnInit {

  @Input() mainPhoto;

  constructor(
      private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  public openUploadDialog(): void {
    this.dialog.open(UploadPhotoDialogComponent).afterClosed().subscribe( () => {
    });
  }

}
