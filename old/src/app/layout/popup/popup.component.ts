import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  @Input() isOpened;

  @Output() handleClose: EventEmitter<any> = new EventEmitter();

  handleClickOutside(event) {
    if (event.toElement.classList[0] === 'modal') {
      this.handleClose.emit();
    }
  }
}
