import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';

import { SujetoComponent } from './sujeto.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [
    SujetoComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule,
  ],
  exports:[
    SujetoComponent
  ]
})
export class SujetoModule { }
