import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { CursosService } from './../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

  id: number;
  subscription: Subscription;
  curso: any;

  constructor(
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private router: Router

  ) {
    console.log(this.route);
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.curso = this.cursosService.getCurso(params['id']);
        if (this.curso == null) {
          this.router.navigate(['/cursos/naoEncontrado']);
        }
      }
    );
  }

//coment

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
