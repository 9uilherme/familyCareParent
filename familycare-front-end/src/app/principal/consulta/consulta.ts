export class Consulta {

    constructor(id: number, descricao: string, endereco: string){
        this.id = id;
        this.descricao = descricao;
        this.endereco = endereco;
    }

    id:number;
    data: Date;
    hora: Date;
    descricao: string;
    endereco: string;
    lembrar: boolean;
    // Criar entidade de membro
    membro: any;
    // Criat entidade de profissional
    profissional: any;

}