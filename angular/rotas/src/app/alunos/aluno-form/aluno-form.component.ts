import { FormCanDeactivate } from '../../guards/form-candeactivate';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

import { AlunosService } from './../alunos.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, OnDestroy, FormCanDeactivate {

  aluno: any;
  subscription: Subscription;
  private formChanged: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private alunosService: AlunosService
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.aluno = this.alunosService.getAluno(params['id']);
        if (this.aluno == null) {
          this.aluno = {};
        }
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onInput() {
    this.formChanged = true;
  }

  canChangeRoute() {
    if (this.formChanged) {
      return confirm('Discard changes');
    }
    return true;
  }

  canDeactivate() {
    return this.canChangeRoute();
  }

}
