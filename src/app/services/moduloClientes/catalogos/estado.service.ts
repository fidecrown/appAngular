import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from 'src/app/interfaces/clientes/catalogos/estado.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  
  private API_REST: string = environment.BASE_URL+ 'catalogos/estados';

  constructor(private http: HttpClient) { }

  getCatalogoEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.API_REST);
  }

}
