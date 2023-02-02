import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { SolicitudIngresoComponent } from './solicitud-ingreso/solicitud-ingreso.component';


@NgModule({
  declarations: [
    SolicitudIngresoComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
