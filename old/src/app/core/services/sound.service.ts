import { Injectable } from '@angular/core';

export const enum SoundType {
  message = 1,
  like = 2,
  comment = 3
}

@Injectable()
export class SoundService {

  playMessage(type?: SoundType) {
    const audio = new Audio();

    switch (type) {
      case 1:
        audio.src = '../../../assets/sounds/message.mp3';
        break;
      case 2:
        audio.src = '../../../assets/sounds/like.mp3';
        break;
      case 3:
        audio.src = '../../../assets/sounds/comment.mp3';
        break;
      default:
        audio.src = '../../../assets/sounds/default.mp3';
    }

    audio.load();
    audio.play();
  }

  playFart() {
    const audio = new Audio();
    audio.src = '../../../assets/sounds/fart.mp3';
    audio.load();
    audio.play();
  }

  playLaugh() {
    const audio = new Audio();
    audio.src = '../../../assets/sounds/laugh.mp3';
    audio.load();
    audio.play();
  }
}
