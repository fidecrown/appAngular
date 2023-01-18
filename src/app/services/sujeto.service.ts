import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prueba, Sujeto } from '../models/sujeto';

@Injectable({
  providedIn: 'root'
})
export class SujetoService {

  private API_REST: string = 'http://localhost:8080/reforma/api/v1/sujetos';

  private API_PRUEBA: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getSujetos(): Observable<Sujeto[]> {
    return this.http.get<Sujeto[]>(this.API_REST);
  }

  getPrueba(): Observable<Prueba[]> {
    return this.http.get<Prueba[]>(this.API_PRUEBA);
  }

}
