import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['../header.component.scss'],
})
export class BurgerMenuComponent {
  @Output() closeBurgerEmitter: EventEmitter<any> = new EventEmitter();
  @Output() showBillingEmitter: EventEmitter<any> = new EventEmitter();
  @Output() doLogoutEmitter: EventEmitter<any> = new EventEmitter();
  @Input() user;
  @Input() is_auth;
  @Input() online;

  constructor(private router: Router) {}

  handleClickCloseMenuAndNavigate(link) {
    this.closeBurgerEmitter.emit();
    this.router.navigate(link);
  }

  showBilling() {
    this.showBillingEmitter.emit();
  }

  closeBurger() {
    this.closeBurgerEmitter.emit();
  }

  doLogout() {
    this.closeBurgerEmitter.emit();
    this.doLogoutEmitter.emit();
  }
}
