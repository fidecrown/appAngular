import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SujetoComponent } from './catalogos/sujeto/sujeto.component';
import { CajasComponent } from './page/cajas/cajas.component';
import { ClientesComponent } from './page/clientes/clientes.component';
import { CreditosComponent } from './page/creditos/creditos.component';

const routes: Routes = [
  {path: 'clientes', component: ClientesComponent},
  {path: 'creditos', component: CreditosComponent},
  {path: 'cajas', component: CajasComponent},
  {path: 'catalogos/sujetos', component: SujetoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
