import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { SolicitudIngresoComponent } from './solicitud-ingreso/solicitud-ingreso.component';
import { DomicilioModule } from './domicilio/domicilio.module';


@NgModule({
  declarations: [
    SolicitudIngresoComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    DomicilioModule
  ]
})
export class ClientesModule { }
