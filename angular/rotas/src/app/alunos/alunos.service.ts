import { Injectable } from '@angular/core';
import { Aluno } from './aluno';

@Injectable()
export class AlunosService {

  private alunos: Aluno[] = [
    {id: 1, nome: 'aluno01', email: 'aluno01@email.com'},
    {id: 2, nome: 'aluno02', email: 'aluno02@email.com'},
    {id: 3, nome: 'aluno03', email: 'aluno03@email.com'},
    {id: 4, nome: 'aluno04', email: 'aluno04@email.com'}
  ]

  getAlunos() {
    return this.alunos;
  }

  getAluno(id: number) {
    let alunos = this.getAlunos();
    for (let i = 0; i < alunos.length; i++) {
      if (id == alunos[i].id) {
        return alunos[i];
      }
    }
    return null;
  }

  constructor() { }

}
