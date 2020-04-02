import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../users/store/users.store';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-feed-detail',
  templateUrl: './detail.popup.feed.component.html',
  styleUrls: ['./detail.popup.feed.component.scss'],
})
export class DetailPopupFeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input() feed: any;
  @Input() is_popup = false;
  @Output() firstVideoDownloaded: EventEmitter<any> = new EventEmitter();
  current_media = 0;
  current_media_time = 0;
  current_media_duration = 0;
  current_thumb_width = 0;
  block_play = false;
  interval_start = 0;
  interval_freeze = 0;
  interval;
  photo_active = true;
  timeout;
  clickable = true;
  clickTimeout;
  isSoundOn = true;

  constructor(private dialogRef: MatDialog, private user_store: Store<User>) {
  }

  initFirstVideo() {
    setTimeout(() => this.firstVideoDownloaded.emit(), 200);
    console.log(this.feed);
  }

  postComment() {
    console.log('post comment');
  }

  playVideo(e, unblock = false) {
    const video = e.target.closest('[data-feed-item]').querySelector('video');
    this.current_media_duration = video.duration;
    video.play();

    if (unblock) {
      this.block_play = false;
    }
    clearTimeout(this.clickTimeout);
  }

  pauseVideo(e, block = false) {
    this.clickable = true;
    e.target
      .closest('[data-feed-item]')
      .querySelector('video')
      .pause();
    if (block) {
      this.block_play = true;
    }

    if (e.type === 'mousedown') {
      this.clickTimeout = setTimeout(() => {
        this.clickable = false;
      }, 200);
    }
  }

  showNextVideo(last = false, isLastVideo) {
    if (last) {
      if (!this.is_popup) {
        this.closeDialog();
      }
    } else {
      this.current_media += 1;
      this.current_thumb_width = 0;
      if (isLastVideo) {
        console.log('mark: last video');
        this.showPhoto();
      }
    }
  }

  showPhoto() {
    const photoTime = 6000;
    this.interval_start = photoTime;
    const last = this.current_media === this.feed.videos.length + this.feed.photos.length;
    this.photo_active = true;
    this.interval = setInterval(() => {
      this.interval_start -= 10;
      // this.current_thumb_width = (this.interval_start / 6000) * 100;
      this.current_thumb_width = (this.interval_start / photoTime) * 100;
      console.log(this.interval_start);
    }, 10);

    if (last) {
      this.current_thumb_width = 100;
      this.current_media -= 1;
      clearInterval(this.interval);
      if (!this.is_popup) {
        this.closeDialog();
      }
    } else {
      this.timeout = setTimeout(() => {
        clearInterval(this.interval);
        this.interval_start = 0;
        this.interval_freeze = 0;
        this.current_thumb_width = 0;
        this.current_media += 1;
        this.showPhoto();
      }, photoTime);
    }

    clearTimeout(this.clickTimeout);
  }

  next() {
    const last = this.current_media === this.feed.videos.length + this.feed.photos.length - 1;
    if (!last) {
      clearInterval(this.interval);
      clearInterval(this.timeout);
      this.interval_start = 0;
      this.interval_freeze = 0;
      this.current_media++;
      this.current_thumb_width = 0;

      const isNextPhoto = this.current_media >= this.feed.videos.length;
      if (isNextPhoto) {
        this.showPhoto();
      }
    }
  }

  prev() {
    if (this.current_media !== 0) {
      clearInterval(this.interval);
      clearInterval(this.timeout);
      this.interval_start = 0;
      this.interval_freeze = 0;
      this.current_media--;
      this.current_thumb_width = 0;

      const isPrevPhoto = this.current_media >= this.feed.videos.length;
      if (isPrevPhoto) {
        this.showPhoto();
      }
    }
  }

  freezePhotoThumb(e) {
    this.clickable = true;
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    this.photo_active = false;

    if (e.type === 'mousedown') {
      this.clickTimeout = setTimeout(() => {
        this.clickable = false;
      }, 500);
    }
  }

  closeDialog() {
    this.dialogRef.closeAll();
  }

  formatVideoTime(time) {
    const timeNumber: any = Number(time).toFixed(0);
    const minutes: number = Math.floor(timeNumber / 60);
    const formattedMinutes = minutes < 10 ? '0' + minutes : timeNumber;
    const seconds: number = timeNumber - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    return formattedMinutes && formattedSeconds
      ? `${formattedMinutes}:${formattedSeconds}`
      : '00:00';
  }

  handleClickSound() {
    this.isSoundOn = !this.isSoundOn;
  }

  videoUpdate(e, _video) {
    const video = e.target;
    this.current_media_time = video.currentTime;
    _video.current_media_time = video.currentTime;
    this.current_thumb_width = (this.current_media_time / this.current_media_duration) * 100;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes): void {
    if (changes.feed.currentValue && changes.feed.currentValue.photos.length) {
      changes.feed.currentValue.photos.map(({ image_big }) => image_big);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    clearInterval(this.timeout);
  }
}
