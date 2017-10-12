import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Aluno } from '../aluno';
import { AlunosService } from './../alunos.service';

@Injectable()
export class AlunosDetalheResolver implements Resolve<Aluno> {
  constructor(
    private alunosService: AlunosService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
      console.log('AlunosDetalheResolver');
      let id = route.params['id'];
      return this.alunosService.getAluno(id);
  }
}
