import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from '../../ambiente/ambiente';
import { Medicamento } from './medicamento';

@Injectable()
export class MedicamentoService {
    
    constructor(private http: HttpClient){}

    salvar(medicamento: Medicamento){
        return this.http.post(`${API_URL}medicamentos`, medicamento);
    }

    listarTodos(){
        return this.http.get(`${API_URL}medicamentos`);
    }

    listarComPaginacao(pagina:number,tamanho:number){
        return this.http.get(`${API_URL}medicamentos/${pagina}/${tamanho}`);
    }

    listarComFiltro(pagina:number,tamanho:number,nomeFilter:string){
        return this.http.get(`${API_URL}medicamentos/${pagina}/${tamanho}/${nomeFilter}`);
    }

    delete(id:string){
        return this.http.delete(`${API_URL}medicamentos/${id}`);
    }

    consultarPorId(id:number){
        return this.http.get(`${API_URL}medicamentos/${id}`);
    }

    listarUnidades(){
        return this.http.get(`${API_URL}unidades`);
    }

    listarIntervalos(){
        return this.http.get(`${API_URL}intervalos`);
    }

    listarMembros(){
        return this.http.get(`${API_URL}membros`);
    }

}