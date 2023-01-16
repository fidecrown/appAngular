import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ClientesComponent } from './page/clientes/clientes.component';
import { CreditosComponent } from './page/creditos/creditos.component';
import { CajasComponent } from './page/cajas/cajas.component';

import { LayoutModule } from './layout/layout.module';

import { CatalogosModule } from './catalogos/catalogos.module';
@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    CreditosComponent,
    CajasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    CatalogosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
