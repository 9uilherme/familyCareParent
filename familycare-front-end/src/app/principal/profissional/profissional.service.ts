import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../ambiente/ambiente';
import { Profissional } from './profissional';

@Injectable()
export class ProfissionalService {
    
    constructor(private http: HttpClient){}

    salvar(profissional: Profissional){
        return this.http.post(`${API_URL}profissionais`, profissional);
    }

    listarTodos(){
        return this.http.get(`${API_URL}profissionais`);
    }

    listarComPaginacao(pagina:number,tamanho:number){
        return this.http.get(`${API_URL}profissionais/${pagina}/${tamanho}`);
    }

    listarComFiltro(pagina:number,tamanho:number,nomeFilter:string){
        return this.http.get(`${API_URL}profissionais/${pagina}/${tamanho}/${nomeFilter}`);
    }

    delete(id:string){
        return this.http.delete(`${API_URL}profissionais/${id}`);
    }

    consultarPorId(id:number){
        return this.http.get(`${API_URL}profissionais/${id}`);
    }

}