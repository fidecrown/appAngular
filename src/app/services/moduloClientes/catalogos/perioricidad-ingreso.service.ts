import { Injectable } from '@angular/core';
import { PerioricidadIngresos } from 'src/app/interfaces/clientes/catalogos/perioricidad-ingresos.interface';

@Injectable({
  providedIn: 'root'
})
export class PerioricidadIngresoService {

  constructor() { }

  private _data: PerioricidadIngresos[] = [
    { peringresoid: 1, descripcion: 'MENSUAL' },
    { peringresoid: 2, descripcion: 'SEMANAL' },
    { peringresoid: 3, descripcion: 'QUINCENAL' },
  ]

  get CatPeriodoIngresos(): PerioricidadIngresos[] {
    return [... this._data];
  }
}
