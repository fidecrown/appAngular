import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SujetoComponent } from './catalogos/sujeto/sujeto.component';
import { CajasComponent } from './page/cajas/cajas.component';

import { CreditosComponent } from './page/creditos/creditos.component';
import { InicioComponent } from './page/inicio/inicio.component';

const routes: Routes = [
  {path: 'inicio',component: InicioComponent},
  {path: 'catalogos', loadChildren: () => import('./catalogos/catalogos.module').then(m => m.CatalogosModule)},
  {path: 'creditos', component: CreditosComponent},
  {path: 'cajas', component: CajasComponent},
  //{path: 'catalogos/sujetos', component: SujetoComponent},
  {path: '**', pathMatch: 'prefix', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
