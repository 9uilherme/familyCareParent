export class Membro{

    constructor(
        private id:number,
        private dataNascimento:Date,
        public nome:string,
        private peso:number,
        private altura:number,
        private sexo:string,
        private tipoSanguineo:string,
        private fatorRH:string,
        private imagemPerfil:string,
    ){}
}