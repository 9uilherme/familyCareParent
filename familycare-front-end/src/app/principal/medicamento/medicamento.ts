export class Medicamento{    

    constructor(
        private id: number,
        public nome:string,
        private data:Date,
        private hora:Date,
        private lembrete:boolean,
        private dosagem:number,
        private unidade:string,
        private intervalo:number,
        private quantidadeDias:number       
        ){}
	
}