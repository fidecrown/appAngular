import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../../../interfaces/clientes/catalogos/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  private API_REST: string = environment.BASE_URL+ 'catalogos/clientes';

  constructor(private http: HttpClient) { }

  getCatalogoClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API_REST);
  }

}
