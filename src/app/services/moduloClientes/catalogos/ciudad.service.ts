import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Ciudad } from 'src/app/interfaces/clientes/catalogos/ciudad.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private API_REST: string = environment.BASE_URL+ 'catalogos/ciudades';

  constructor(private http: HttpClient) { }

  getCatCiudadesxEstadoId(estadoid: number): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${this.API_REST}/${estadoid}`);
  }
}
