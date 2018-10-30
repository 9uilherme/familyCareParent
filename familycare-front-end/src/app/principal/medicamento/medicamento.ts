import { Membro } from '../membro/membro';

export class Medicamento{    

    constructor(
        public id: number,
        public nome:string,
        public membro:Membro,
        public data:Date,
        public hora:Date,
        public lembrete:boolean,
        public dosagem:number,
        public unidade:string,
        public intervalo:number,
        public quantidadeDias:number       
        ){}
	
}