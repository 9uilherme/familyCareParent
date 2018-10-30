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