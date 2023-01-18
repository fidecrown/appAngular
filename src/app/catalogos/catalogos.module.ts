import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { SujetoComponent } from './sujeto/sujeto.component';



@NgModule({
  declarations: [
    SujetoComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule
  ],
  exports:[
    SujetoComponent
  ]
})
export class CatalogosModule { }
