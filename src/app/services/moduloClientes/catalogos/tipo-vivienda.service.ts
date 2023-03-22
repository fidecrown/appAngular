import { Injectable } from '@angular/core';
import { TipoVivienda } from 'src/app/interfaces/clientes/catalogos/tipo-vivienda.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoViviendaService {

  constructor() { }

  private _data: TipoVivienda[] = [
    { tipviviendaid: 1, descripcion: 'COMPARTIDA' },
    { tipviviendaid: 2, descripcion: 'FAMILIAR' },
    { tipviviendaid: 3, descripcion: 'OTRA' },
    { tipviviendaid: 4, descripcion: 'RENTADA' },
  ]

  get CatTipoVivienda(): TipoVivienda[] {
    return [... this._data];
  }
}
