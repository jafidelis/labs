import { AlunosDeactivateGuard } from './../guards/alunos.deactivate.guard';
import { NgModule } from '@angular/core';
import { CanActivateChild, RouterModule, CanDeactivate } from '@angular/router';

import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosComponent } from './alunos.component';
import { AlunosGuard } from './../guards/alunos.guard';
import { AlunosDetalheResolver } from './guards/alunos.detalhe.resolver';

const alunosRoutes = [
  { path: '',
    component: AlunosComponent,
    canActivateChild: [AlunosGuard],
    children: [
    { path: 'novo', component: AlunoFormComponent },
    { path: ':id',
      component: AlunoDetalheComponent,
      resolve: { aluno: AlunosDetalheResolver }
    },
    { path: ':id/editar',
      component: AlunoFormComponent,
      canDeactivate: [AlunosDeactivateGuard] }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule {}
