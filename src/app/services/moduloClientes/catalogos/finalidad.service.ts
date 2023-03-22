import { Injectable } from '@angular/core';
import { Finalidad } from 'src/app/interfaces/clientes/catalogos/finalidad.interface';

@Injectable({
  providedIn: 'root'
})
export class FinalidadService {

  constructor() { }

  private _data: Finalidad[] = [
    { finalidadid: 1, descripcion: 'AHORRO' },
    { finalidadid: 2, descripcion: 'CRÉDITO' },
    { finalidadid: 3, descripcion: 'INVERTIR' },
  ]

  get CatFinalidad(): Finalidad[] {
    return [... this._data];
  }
}
