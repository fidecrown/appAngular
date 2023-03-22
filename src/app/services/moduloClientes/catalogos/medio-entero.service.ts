import { Injectable } from '@angular/core';
import { MedioEntero } from 'src/app/interfaces/clientes/catalogos/medio-entero.interface';

@Injectable({
  providedIn: 'root'
})
export class MedioEnteroService {

  constructor() { }

  private _data: MedioEntero[] = [
    { medioenteroid: 1, descripcion: 'PERIÓDICO' },
    { medioenteroid: 2, descripcion: 'RADIO' },
    { medioenteroid: 3, descripcion: 'RECOMENDACIÓN' },
    { medioenteroid: 4, descripcion: 'TELEVISIÓN' },
    { medioenteroid: 5, descripcion: 'VOLANTE' },
  ]

  get CatMedioEntero(): MedioEntero[] {
    return [... this._data];
  }
}
