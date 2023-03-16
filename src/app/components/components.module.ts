import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectedComponent } from './controls/selected/selected.component';



@NgModule({
  declarations: [SelectedComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SelectedComponent
  ]
})
export class ComponentsModule { }
