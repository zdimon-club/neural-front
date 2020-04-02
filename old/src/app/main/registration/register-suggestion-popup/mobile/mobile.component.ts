import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-suggestion-popup-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['../register-suggestion-popup.component.scss', './mobile.component.scss'],
})
export class RegisterSuggestionPopupMobileComponent {
  @Input() email;
  @Input() currentGender;
  @Output() emitHandleClickGender: EventEmitter<any> = new EventEmitter();
  @Output() emitHandleClosePopup: EventEmitter<any> = new EventEmitter();

  handleClickGender(gender) {
    this.emitHandleClickGender.emit(gender);
    this.handleClosePopup();
  }
  handleClosePopup() {
    this.emitHandleClosePopup.emit();
  }
}
