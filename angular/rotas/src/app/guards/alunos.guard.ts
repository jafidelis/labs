import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AlunosGuard implements CanActivateChild {
  	canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean>|boolean {
      console.log(route);
      console.log(state);

      console.log('AlunosGuard', 'guarda de rotas filhas');

      if (state.url.includes('editar')) {
        // alert('access denied');
        // return false;
      }
      return true;
    }
}
