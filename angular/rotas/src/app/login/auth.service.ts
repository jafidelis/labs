import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user';

@Injectable()
export class AuthService {

  private userAuthenticate: boolean = false;
  showMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  login(user: User) {
    if (user.name === 'user@email.com' && user.password === '123456') {
      this.userAuthenticate = true;
      this.showMenuEmitter.emit(true);
      this.router.navigate(['/']);
    } else {
      this.userAuthenticate = false;
    }
  }

  isUserAuthenticate() {
    return this.userAuthenticate;
  }

}
