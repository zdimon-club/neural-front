import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent {
  @Input() isLiked;

  @Output() emitClick: EventEmitter<any> = new EventEmitter();

  public is_anim_started = false;

  handleClick(): void {
    this.emitClick.emit();
    this.is_anim_started = true;
  }

  handleAnimationEnd(): void {
    this.is_anim_started = false;
  }
}
