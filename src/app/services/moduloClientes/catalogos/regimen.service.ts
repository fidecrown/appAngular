import { Injectable } from '@angular/core';
import { Regimen } from 'src/app/interfaces/clientes/catalogos/regimen.interface';

@Injectable({
  providedIn: 'root'
})
export class RegimenService {

  constructor() { }

  private _data: Regimen[] = [
    { regimenid: 1, descripcion: 'BIENES MANCOMUNADOS' },
    { regimenid: 2, descripcion: 'BIENES SEPARADOS' },
    { regimenid: 3, descripcion: 'NO APLICA' },
  ]

  get CatRegimen(): Regimen[] {
    return [... this._data];
  }

}
