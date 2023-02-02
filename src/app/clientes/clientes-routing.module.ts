import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudIngresoComponent } from './solicitud-ingreso/solicitud-ingreso.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'solicitudIngreso', component: SolicitudIngresoComponent },
      { path: '**', redirectTo: 'solicitudIngreso' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
