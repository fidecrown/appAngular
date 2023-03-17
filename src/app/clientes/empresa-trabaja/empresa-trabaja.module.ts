import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaTrabajaComponent } from './empresa-trabaja/empresa-trabaja.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmpresaTrabajaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    EmpresaTrabajaComponent
  ]
})
export class EmpresaTrabajaModule { }
