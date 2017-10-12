import { Injectable } from '@angular/core';

@Injectable()
export class CursosService {

  getCursos() {
    return [
      { id: 1, name: 'Angular' },
      { id: 2, name: 'Nodejs' },
      { id: 3, name: 'Golang' }
    ];
  }

  getCurso(id: number) {
    let cursos = this.getCursos();
    for (let i = 0; i < cursos.length; i++) {
      if (id == cursos[i].id) {
        return cursos[i];
      }
    }
    return null;
  }

  constructor() { }

}
