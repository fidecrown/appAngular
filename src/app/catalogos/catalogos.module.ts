import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SujetoComponent } from './sujeto/sujeto.component';



@NgModule({
  declarations: [
    SujetoComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SujetoComponent
  ]
})
export class CatalogosModule { }
