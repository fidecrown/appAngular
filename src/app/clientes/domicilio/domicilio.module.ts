import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomicilioRoutingModule } from './domicilio-routing.module';
import { DomicilioComponent } from './domicilio/domicilio.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DomicilioComponent
  ],
  imports: [
    CommonModule,
    DomicilioRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    DomicilioComponent
  ]
})
export class DomicilioModule { }
