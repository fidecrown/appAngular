import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogosRoutingModule } from './catalogos-routing.module';
import { SujetoModule } from './sujeto/sujeto.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CatalogosRoutingModule,
    SujetoModule
  ],
  exports:[

  ]
})
export class CatalogosModule { }
