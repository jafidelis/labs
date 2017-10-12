import { Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlunosService } from './../alunos.service';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit {

  aluno: Aluno;
  subscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunosService: AlunosService
  ) { }

  ngOnInit() {
    // this.subscription = this.route.params.subscribe(
    //   (params: any) => {
    //     this.aluno = this.alunosService.getAluno(params['id']);
    //   }
    // )
    this.subscription = this.route.data.subscribe(
      (data: {aluno: Aluno}) => {
        console.log(data);
        this.aluno = data.aluno;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editarAluno() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar']);
  }

}
