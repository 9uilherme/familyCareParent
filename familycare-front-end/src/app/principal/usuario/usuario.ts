import { EmailValidator } from '@angular/forms';

export interface Usuario{
    id:number,
    nome:string,
    password:string,
    imagemPerfil:string,
    perfil:string,
    email:string
}