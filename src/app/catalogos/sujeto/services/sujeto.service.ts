import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sujeto } from '../interface/sujeto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SujetoService {

  private API_REST: string = environment.BASE_URL+ 'sujetos';

  constructor(private http: HttpClient) { }

  getSujetos(): Observable<Sujeto[]> {
    return this.http.get<Sujeto[]>(this.API_REST);
  }

  saveSujeto(sujeto: Sujeto): Observable<any> {
    return this.http.post<any>(this.API_REST, sujeto);
  }

  getSujetoById(sujetoid: number): Observable<Sujeto>{
    return this.http.get<Sujeto>(`${this.API_REST}/${sujetoid}`);
  }

  updateSujeto(sujetoid: number, sujeto : Sujeto): Observable<any>{
    return this.http.put<any>(`${this.API_REST}/${sujetoid}`,sujeto);
  }

  deleteSujeto(sujetoid: number):Observable<any>{
    return this.http.delete<any>(`${this.API_REST}/${sujetoid}`);
  }

}
