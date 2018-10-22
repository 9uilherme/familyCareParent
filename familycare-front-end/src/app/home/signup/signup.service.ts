import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NovoUsuario } from './novo-usuario';

const API_URL = 'http://localhost:8080/usuarios/';

@Injectable()
export class SignUpService {

    constructor(private http: HttpClient){}

    checkUserNameTaken(userName:string){
        return this.http.get(API_URL + 'existe/' + userName);
    }

    signup(novoUsuario: NovoUsuario){
        return this.http.post(API_URL, novoUsuario);
    }
}