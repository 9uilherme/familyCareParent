import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from '../../ambiente/ambiente';
import { Usuario } from './usuario';

@Injectable()
export class UsuarioService {
    
    constructor(private http: HttpClient){}

    alterar(usuario: Usuario){
        return this.http.put(`${API_URL}usuarios`, usuario);
    }

    consultarPorEmail(email:string){
        return this.http.get(`${API_URL}usuarios/${email}`);
    }

}