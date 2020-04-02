import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import { DropMenu } from './dropmenu.interface';

@Component({
  selector: 'app-dropmenu',
  templateUrl: './dropmenu.component.html',
  styleUrls: ['./dropmenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropmenuComponent {
  @Input() data: DropMenu;
  @Input() turn = new EventEmitter<boolean>();
  isDropdownOpened = false;
  toggleCamera = false;

  constructor(
    private router: Router,
  ) {
  }

  runMethod(method: string, arg: string, index) {
    if (index === this.data.buttons.length - 1) {
      if (this.toggleCamera === false) {
        this.turn.emit(true);
      } else {
        this.turn.emit(false);
      }
      this.toggleCamera = !this.toggleCamera;
    } else {
      this[method](arg);
    }
  }

  handleClickOutsideDropdown() {
    if (this.isDropdownOpened) {
      this.isDropdownOpened = false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpened = !this.isDropdownOpened;
  }

  private navigate(link: string) {
    this.router.navigate([link]);
  }
}
