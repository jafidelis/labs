import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { FormCanDeactivate } from './form-candeactivate';

@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<FormCanDeactivate> {
    constructor() {}

    canDeactivate(
      component: FormCanDeactivate,
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
      return component.canDeactivate();
  }
}
