import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { FieldControlErrorComponent } from './field-control-error/field-control-error.component';
import { DropdownService } from './services/dropdown.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    FormDebugComponent,
    FieldControlErrorComponent
  ],
  exports: [
    FormDebugComponent,
    FieldControlErrorComponent
  ],
  providers: [
    DropdownService
  ]
})
export class SharedModule { }
