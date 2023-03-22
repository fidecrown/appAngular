import { Injectable } from '@angular/core';
import { TiempoArraigo } from 'src/app/interfaces/clientes/catalogos/tiempo-arraigo.interface';

@Injectable({
  providedIn: 'root'
})
export class TiempoArraigoService {

  constructor() { }

  private _data: TiempoArraigo[] = [
    { tiempoarraigoid: 1, descripcion: 'MENOS DE 1 AÑO' },
    { tiempoarraigoid: 2, descripcion: 'MENOS DE 3 AÑOS' },
    { tiempoarraigoid: 3, descripcion: 'MENOS DE 5 AÑOS' },
    { tiempoarraigoid: 4, descripcion: 'MAS DE 5 AÑOS' }
  ]

  get CatTiempoArraigo(): TiempoArraigo[] {
    return [... this._data];
  }

}
