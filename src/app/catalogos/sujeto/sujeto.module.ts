import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';

import { SujetoComponent } from './page/sujeto.component';
import { ListSujetosComponent } from './page/list-sujetos/list-sujetos.component';

@NgModule({
  declarations: [
    SujetoComponent,
    ListSujetosComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  exports: [
    SujetoComponent
  ]
})
export class SujetoModule { }
