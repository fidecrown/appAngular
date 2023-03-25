import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AltaSolicitudCliente } from 'src/app/interfaces/clientes/catalogos/alta-solicitud-cliente.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AltaSolicitudClienteService {

  constructor(private http: HttpClient) { }

  private API_REST: string = environment.BASE_URL+ 'alta-solicitud';

  createAltaSolCliente(datos: AltaSolicitudCliente): Observable<any> {
    console.log('ESTO SE MANDA A LA BD');
    console.log(datos);
    //return new Observable;
    return this.http.post<any>(this.API_REST, datos);
  }

}
