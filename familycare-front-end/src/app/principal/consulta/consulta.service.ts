import { API_URL } from './../../ambiente/ambiente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import {map, catchError} from "rxjs/operators";

@Injectable()
export class ConsultaService {

  constructor(private http: HttpClient) { }

  listar(): Observable<any> {
    return this.http.get(`${API_URL}consultas`);
  }
  listarPorId(id: number): Observable<any> {
    return this.http.get(`${API_URL}consultas/${id}`);
  }
  salvar(consulta: any): Observable<any> {
    return this.http.post(`${API_URL}consultas`, consulta)
    .pipe(
      map((resp:any) => resp), 
      catchError((e:Response)=> throwError(e)));
  }
}