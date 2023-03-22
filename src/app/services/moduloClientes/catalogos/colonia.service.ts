import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colonia } from 'src/app/interfaces/clientes/catalogos/colonia.interface';

@Injectable({
  providedIn: 'root'
})
export class ColoniaService {

  private API_REST: string = environment.BASE_URL+ 'catalogos/colonias';

  constructor(private http: HttpClient) { }

  getCatColoniasxCiudadId(ciudadid: number): Observable<Colonia[]> {
    return this.http.get<Colonia[]>(`${this.API_REST}/${ciudadid}`);
  }
}
