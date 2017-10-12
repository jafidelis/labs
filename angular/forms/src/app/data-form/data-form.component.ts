import { DropdownService } from './../shared/services/dropdown.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';

import { StateBr } from './../shared/models/state-br.model';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulary: FormGroup;
  states: StateBr[];

  constructor(
    private formBuilder: FormBuilder,
    private http: Http,
    private dropdownService: DropdownService
  ) { }

  ngOnInit() {
    this.dropdownService.getStatesBr().subscribe(data => this.states = data)

    // this.formulary = new FormGroup({
    //   name: new FormControl(null),
    //   email: new FormControl(null)
    // });

    this.formulary = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      address: this.formBuilder.group({
        zip: [null, Validators.required],
        number: [null, Validators.required],
        complement: [null],
        street: [null, Validators.required],
        district: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required]
      })
    });
  }

  onSubmit() {
    console.log('passou');
    console.log(this.formulary.value);

    if (this.formulary.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulary.value))
      .map(resp => resp)
      .subscribe(data => {
        console.log(data);
        this.resetForm();
      },
        (err: any) => alert('Error ' + err)
      );
    } else {
      console.log('formulary invalid');

      // Object.keys(this.formulary.controls).forEach(field => {
      //   console.log(field);
      //   const control = this.formulary.get(field);
      //   control.markAsDirty();
      // });

      this.verifyFormValidate(this.formulary);
    }
  }

  verifyFormValidate(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      control.markAsDirty();
      if (control instanceof FormGroup) {
        console.log('re');
        this.verifyFormValidate(control);
      }
    });
  }

  resetForm() {
    this.formulary.reset();
  }

  isInvalidAndTouched(name: string) {
    return !this.formulary.get(name).valid && (this.formulary.get(name).touched || this.formulary.get(name).dirty);
  }

  isFieldValid(name) {
    return {
      'is-invalid': this.isInvalidAndTouched(name)
    };
  }

  zipCodeQuery() {
    let zip = this.formulary.get('address.zip').value;
    console.log(zip);
    zip = zip ? zip.replace(/\D/g, '') : '';
    if (zip !== '') {
      const checkedZip = /^[0-9]{8}$/;
      if (checkedZip.test(zip)) {
        this.http.get(`//viacep.com.br/ws/${zip}/json`)
          .map(data => data.json())
          .subscribe(data => this.setDataForm(data));

      }
    }

  }

  setDataForm(data) {
    this.formulary.patchValue({
      address: {
        zip: data.cep,
        complement: data.complemento,
        street: data.logradouro,
        district: data.bairro,
        city: data.localidade,
        state: data.uf
      }
    });
  }

}
