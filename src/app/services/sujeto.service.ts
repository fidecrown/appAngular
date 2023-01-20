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

  saveSujeto(sujeto: Sujeto): Observable<any> {
    return this.http.post<any>(this.API_REST, sujeto);
  }

  getSujetoById(sujetoid: number): Observable<Sujeto>{
    return this.http.get<Sujeto>(this.API_REST + '/' + sujetoid);
  }

  updateSujeto(sujetoid: number, sujeto : Sujeto): Observable<any>{
    return this.http.put<any>(`${this.API_REST}/${sujetoid}`,sujeto);
  }

  getPrueba(): Observable<Prueba[]> {
    return this.http.get<Prueba[]>(this.API_PRUEBA);
  }

}
