import { Injectable } from '@angular/core';
import { Referencia } from '../../../interfaces/clientes/catalogos/referencia.interface';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaService {

  constructor() { }

  private _data: Referencia[] = [
    { referenciaid: 1, descripcion: 'BENEFICIARIO' },
    { referenciaid: 2, descripcion: 'REFERENCIA PERSONAL' },
    { referenciaid: 3, descripcion: 'APODERADO LEGAL' },
    { referenciaid: 4, descripcion: 'COOTITULAR' },
    { referenciaid: 5, descripcion: 'CÓNYUGE' },
    { referenciaid: 6, descripcion: 'DEPENDIENTE ECONóMICO' },
  ]

  get CatReferencia(): Referencia[] {
    return [... this._data];
  }

}
