import { Injectable } from '@angular/core';
import { PeriodoMovimientos } from 'src/app/interfaces/clientes/catalogos/periodo-movimientos.interface';

@Injectable({
  providedIn: 'root'
})
export class PeriodoMovimientosService {

  constructor() { }

  private _data: PeriodoMovimientos[] = [
    { movimientoid: 1, descripcion: 'DIARIO' },
    { movimientoid: 2, descripcion: 'SEMANAL' },
    { movimientoid: 3, descripcion: 'QUINCENAL' },
    { movimientoid: 4, descripcion: 'MENSUAL' },
  ]

  get CatPeriodoMovimientos(): PeriodoMovimientos[] {
    return [... this._data];
  }

}
