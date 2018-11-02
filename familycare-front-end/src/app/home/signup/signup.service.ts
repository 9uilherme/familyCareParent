import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../ambiente/ambiente';
import { NovoUsuario } from './novo-usuario';

@Injectable()
export class SignUpService {

    constructor(private http: HttpClient){}

    checkUserNameTaken(userName:string){
        return this.http.get(`${API_URL}usuarios/existe/${userName}`);
    }

    signup(novoUsuario: NovoUsuario){
        return this.http.post(`${API_URL}usuarios`, novoUsuario);
    }
}