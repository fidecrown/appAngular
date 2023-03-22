import { Injectable } from '@angular/core';
import { EstadoCivil } from 'src/app/interfaces/clientes/catalogos/estado-civil.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {

  constructor() { }

  private _data: EstadoCivil[] = [
    { edocivilid: 1, descripcion: 'CASADO(A)' },
    { edocivilid: 2, descripcion: 'DIVORCIADO(A)' },
    { edocivilid: 3, descripcion: 'SEPARADO(A)' },
    { edocivilid: 4, descripcion: 'SOLTERO(A)' },
    { edocivilid: 5, descripcion: 'UNION LIBRE' },
    { edocivilid: 6, descripcion: 'VIUDO(A)' },

  ]

  get CatEdoCivil(): EstadoCivil[] {
    return [... this._data];
  }
}
