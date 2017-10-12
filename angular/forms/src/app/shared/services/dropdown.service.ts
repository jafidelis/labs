import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class DropdownService {

  constructor(private http: Http) { }

  getStatesBr() {
    return this.http.get('assets/data/states-br.json')
      .map((res: Response) => res.json());
  }

}
