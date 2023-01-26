import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { Prueba, Sujeto } from '../interface/sujeto';

@Injectable({
  providedIn: 'root'
})
export class SujetoService {

  private _API_REST: string = 'http://localhost:8080/reforma/api/v1/sujetos';

  public sujetos: Sujeto[] = [];

  constructor(private http: HttpClient) { }

  getSujetos(): Observable<Sujeto[]> {
    return this.http.get<Sujeto[]>(this._API_REST);
  }

  getListSujetos(): void {
    this.http.get<Sujeto[]>(this._API_REST).subscribe(data => {
      this.sujetos = data;
    });
  }

  saveSujeto(sujeto: Sujeto): Observable<any> {
    return this.http.post<any>(this._API_REST, sujeto);
  }

  getSujetoById(sujetoid: number): Observable<Sujeto> {
    return this.http.get<Sujeto>(`${this._API_REST}/${sujetoid}`);
  }

  updateSujeto(sujetoid: number, sujeto: Sujeto): Observable<any> {
    return this.http.put<any>(`${this._API_REST}/${sujetoid}`, sujeto);
  }

  deleteSujeto(sujetoid: number): Observable<any> {
    return this.http.delete<any>(`${this._API_REST}/${sujetoid}`);
  }

}
