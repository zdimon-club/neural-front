
import { VideoDetailComponent } from './detail.component';
import { VideoService } from './video.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import {VideoComponent} from './video.component';
import { MatVideoModule } from 'mat-video';
import { VideoCameraDialogComponent } from './camera.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
    {
        path     : 'detail/:id',
        component: VideoDetailComponent,
        children : []
    },
    {
        path     : '**',
        component: VideoComponent,
        children : []
    }
];

@NgModule({
    declarations: [
        VideoComponent,
        VideoDetailComponent,
        VideoCameraDialogComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        SharedModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatGridListModule,
        MatVideoModule,
        MatSnackBarModule
    ],
    providers   : [
        VideoService
    ],
    entryComponents: [
        VideoCameraDialogComponent
    ],
})
export class VideoModule
{
}

