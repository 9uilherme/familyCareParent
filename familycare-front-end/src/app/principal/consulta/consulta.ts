export class Membro {
    nome: string;
}

export class Profissional {
    nome: string;
}

export class Consulta {

    id:number;
    data: Date;
    hora: Date;
    descricao: string;
    endereco: string;
    lembrar: boolean;
    // Criar entidade de membro
    membro: Membro;
    // Criat entidade de profissional
    profissional: Profissional;

}