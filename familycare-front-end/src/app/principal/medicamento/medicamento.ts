import { Membro } from '../membro/membro';

export interface Medicamento{    
    id: number,
    nome:string,
    membro:Membro,
    data:Date,
    hora:Date,
    lembrete:boolean,
    dosagem:number,
    unidade:string,
    intervalo:number,
    quantidadeDias:number
}