import { Membro } from '../membro/membro';
import { Profissional } from '../profissional/profissional';

export interface Consulta {

    id:number;
    data:Date,
    hora:Date,
    descricao: string;
    endereco: string;
    lembrete: boolean;
    membro: Membro;
    profissional: Profissional;
}