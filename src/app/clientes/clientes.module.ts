import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { SolicitudIngresoComponent } from './solicitud-ingreso/solicitud-ingreso.component';
import { DomicilioModule } from './domicilio/domicilio.module';
import { SujetoModule } from './sujeto/sujeto.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpresaTrabajaModule } from './empresa-trabaja/empresa-trabaja.module';

@NgModule({
  declarations: [
    SolicitudIngresoComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    DomicilioModule,
    SujetoModule,
    EmpresaTrabajaModule,
    ReactiveFormsModule
  ]
})
export class ClientesModule { }
