export class Membro{

    constructor(
        public id:number,
        public dataNascimento:Date,
        public nome:string,
        public peso:number,
        public altura:number,
        public sexo:string,
        public tipoSanguineo:string,
        public fatorRH:string,
        public imagemPerfil:string,
    ){}
}