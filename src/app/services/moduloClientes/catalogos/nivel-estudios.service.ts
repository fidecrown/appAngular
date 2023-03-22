import { Injectable } from '@angular/core';
import { Estudios } from 'src/app/interfaces/clientes/catalogos/estudios.interface';

@Injectable({
  providedIn: 'root'
})
export class NivelEstudiosService {

  constructor() { }

  private _data: Estudios[] = [
    { estudioid: 1, descripcion: 'NINGUNO' },
    { estudioid: 2, descripcion: 'PRIMARIA' },
    { estudioid: 3, descripcion: 'SECUNDARIA' },
    { estudioid: 4, descripcion: 'PREPARATORIA' },
    { estudioid: 5, descripcion: 'LICENCIATURA' },
    { estudioid: 6, descripcion: 'DOCTORADO' },
    { estudioid: 7, descripcion: 'MAESTRIA' },
  ]

  get CatEstudios(): Estudios[] {
    return [... this._data];
  }

}
