import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SujetoComponent } from './catalogos/sujeto/page/sujeto.component';
import { CajasComponent } from './page/cajas/cajas.component';
import { ClientesComponent } from './page/clientes/clientes.component';
import { CreditosComponent } from './page/creditos/creditos.component';
import { InicioComponent } from './page/inicio/inicio.component';

const routes: Routes = [
  {path: 'inicio',component: InicioComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'creditos', component: CreditosComponent},
  {path: 'cajas', component: CajasComponent},
  {path: 'catalogos/sujetos', component: SujetoComponent},
  {path: '**', pathMatch: 'prefix', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
