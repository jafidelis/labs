import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './../login/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {

    console.log('AuthGuard');

    if (this.authService.isUserAuthenticate()) {
      return true;
    }

    this.router.navigate(['/login']);

    return this.accesVerify();
  }

  private accesVerify() {
    if (this.authService.isUserAuthenticate()) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }

  canLoad(
    route: Route
  ): Observable<boolean>|Promise<boolean>|boolean {
    console.log('Verificando se usuário pode baixar o módulo');
    return this.accesVerify();
  }

}
