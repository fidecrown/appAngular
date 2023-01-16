import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sujeto } from '../models/sujeto';

@Injectable({
  providedIn: 'root'
})
export class SujetoService {

  private API_REST: string = 'http://localhost:8080/reforma/api/v1/sujetos';

  constructor(private http: HttpClient) { }

  public getSujetos(): Observable<Sujeto[]> {
    return this.http.get<Sujeto[]>(this.API_REST);
  }

}
