import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesComponent } from './clientes/clientes.component';
import { CreditosComponent } from './creditos/creditos.component';
import { CajasComponent } from './cajas/cajas.component';
import { InicioComponent } from './inicio/inicio.component';


@NgModule({
  declarations: [
    ClientesComponent,
    CreditosComponent,
    CajasComponent,
    InicioComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PageModule { }
