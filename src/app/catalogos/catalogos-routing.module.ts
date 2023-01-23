import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SujetoComponent } from './sujeto/sujeto.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'sujetos', component: SujetoComponent },
      { path: '**', redirectTo: 'sujeto' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CatalogosRoutingModule { }
