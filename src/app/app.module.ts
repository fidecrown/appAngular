import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from './layout/layout.module';
import { CatalogosModule } from './catalogos/catalogos.module';
import { PageModule } from './page/page.module';

import { AppComponent } from './app.component';
import { ClientesModule } from './clientes/clientes.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    CatalogosModule,
    ClientesModule,
    PageModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
