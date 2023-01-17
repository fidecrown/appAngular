import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataBibliotecaService {

  /*NOTE - ESTE EVENTO NOS PERMITE TENER COMUNICACION CON EL COMPONENTE: layout/content-header
          Y PODER INCRUSTARLE EL NOMBRE DEL MODULO EN TURNO
  */
  descripModulo$ =  new EventEmitter<string>();

  constructor() { }
}
