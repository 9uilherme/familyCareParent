import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from '../../ambiente/ambiente';
import { Membro } from './membro';

@Injectable()
export class MembroService {
    
    constructor(private http: HttpClient){}

    salvar(membro: Membro){
        return this.http.post(`${API_URL}membros`, membro);
    }

    listarTodos(){
        return this.http.get(`${API_URL}membros`);
    }

    listarComPaginacao(pagina:number,tamanho:number){
        return this.http.get(`${API_URL}membros/${pagina}/${tamanho}`);
    }

    listarComFiltro(pagina:number,tamanho:number,nomeFilter:string){
        return this.http.get(`${API_URL}membros/${pagina}/${tamanho}/${nomeFilter}`);
    }

    delete(id:string){
        return this.http.delete(`${API_URL}membros/${id}`);
    }

    consultarPorId(id:number){
        return this.http.get(`${API_URL}membros/${id}`);
    }

    listarSexos(){
        return this.http.get(`${API_URL}sexos`);
    }

    listarTiposSanguineos(){
        return this.http.get(`${API_URL}tipossanguineos`);
    }

    listarFatoresRh(){
        return this.http.get(`${API_URL}fatoresrh`);
    }

}