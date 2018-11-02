import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { API_URL } from './../../ambiente/ambiente';
import { Consulta } from './consulta';

@Injectable()
export class ConsultaService {

  constructor(private http: HttpClient) { }

  listar(): Observable<any> {
    return this.http.get(`${API_URL}consultas`);
  }
  
  salvar(consulta: Consulta) {
    return this.http.post(`${API_URL}consultas`, consulta);
  }

  listarTodos() {
    return this.http.get(`${API_URL}consultas`);
  }

  listarComPaginacao(pagina: number, tamanho: number) {
    return this.http.get(`${API_URL}consultas/${pagina}/${tamanho}`);
  }

  listarComFiltro(pagina: number, tamanho: number, nomeFilter: string) {
    return this.http.get(`${API_URL}consultas/${pagina}/${tamanho}/${nomeFilter}`);
  }

  delete(id: string) {
    return this.http.delete(`${API_URL}consultas/${id}`);
  }

  consultarPorId(id: number) {
    return this.http.get(`${API_URL}consultas/${id}`);
  }

}