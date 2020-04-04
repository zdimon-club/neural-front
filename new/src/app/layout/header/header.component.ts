/* author Dmitry Zharikov zdimon77@gmail.com */

import { Component, OnInit, Input } from '@angular/core';


// Session store
import { Store } from '@ngrx/store';
import { SessionState } from '../../auth/store/session.store';
import { selectIsAuth } from './../../auth/store/session.selector';

// Services
import { LoginService } from './../../auth/login.service';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isAuth;
  @Input() user;

  public allUsers = {
    men: [],
    women: [],
  };

  constructor(
    private sessionStore: Store<SessionState>,
    private loginService: LoginService,
    private authService: AuthService,
  ) { 
    for (let i = 1; i <= 19; i++) {
      const man = {
        name: `Man${i}`,
        value: { username: `man${i}@gmail.com`, password: `man${i}` },
      };
      const woman = {
        name: `Woman${i}`,
        value: { username: `woman${i}@gmail.com`, password: `woman${i}` },
      };
      this.allUsers.men.push(man);
      this.allUsers.women.push(woman);
    }
  }


  ngOnInit() {
  }

  doLogout(){
    this.loginService.logout();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(res => {
        this.authService.authState.subscribe(user => {
          this.loginService.loginGoogle(user);
        });
      });

  }



  public loginAs(user) {
    this.loginService.login(user);
  }


}
