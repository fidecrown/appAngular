import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nacionalidad } from 'src/app/interfaces/clientes/catalogos/nacionalidad.interface';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadService {

  private API_REST: string = environment.BASE_URL+ 'catalogos/nacionalidades';

  constructor(private http: HttpClient) { }

  getCatalogoNacionalidades(): Observable<Nacionalidad[]> {
    return this.http.get<Nacionalidad[]>(this.API_REST);
  }

}
