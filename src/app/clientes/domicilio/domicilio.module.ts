import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomicilioRoutingModule } from './domicilio-routing.module';
import { DomicilioComponent } from './domicilio/domicilio.component';


@NgModule({
  declarations: [
    DomicilioComponent
  ],
  imports: [
    CommonModule,
    DomicilioRoutingModule
  ]
})
export class DomicilioModule { }
