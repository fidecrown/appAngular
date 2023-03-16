import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SujetoComponent } from './sujeto/sujeto.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SujetoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SujetoComponent
  ]
})
export class SujetoModule { }
