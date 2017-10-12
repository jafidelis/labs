import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  user: any = {
    name: null,
    email: null
  };

  constructor(
    private http: Http
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
      .map(resp => resp)
      .subscribe(data => console.log(data));
  }

  zipCodeQuery(zip, f) {
    console.log(zip);
    zip = zip.replace(/\D/g, '');
    if (zip != "") {
      let checkedZip = /^[0-9]{8}$/;
      if(checkedZip.test(zip)) {
        this.http.get(`//viacep.com.br/ws/${zip}/json`)
          .map(data => data.json())
          .subscribe(data => this.setDataForm(data, f));

      }
    }

  }

  setDataForm(data, form) {
    // form.setValue({
    //   name: null,
    //   email: null,
    //   address: {
    //     zip: data.cep,
    //     number: '',
    //     complement: data.complemento,
    //     address: data.logradouro,
    //     district: data.bairro,
    //     city: data.localidade,
    //     state: data.uf
    //   }
    // });

    form.form.patchValue({
      address: {
        zip: data.cep,
        complement: data.complemento,
        address: data.logradouro,
        district: data.bairro,
        city: data.localidade,
        state: data.uf
      }
    });
  }

}
