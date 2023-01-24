import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { CatalogosRoutingModule } from './catalogos-routing.module';

import { SujetoComponent } from './sujeto/sujeto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './sujeto/list/list.component';




@NgModule({
  declarations: [
    SujetoComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CatalogosRoutingModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  exports:[
    SujetoComponent
  ]
})
export class CatalogosModule { }
