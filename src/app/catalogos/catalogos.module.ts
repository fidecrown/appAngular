import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { SujetoComponent } from './sujeto/sujeto.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    SujetoComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  exports:[
    SujetoComponent
  ]
})
export class CatalogosModule { }
