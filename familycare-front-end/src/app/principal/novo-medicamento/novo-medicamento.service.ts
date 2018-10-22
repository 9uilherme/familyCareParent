import { API_URL } from './../../ambiente/ambiente';

import { Injectable } from '@angular/core';
import { Medicameto } from './medicamento';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NovoMedicamentoService {
    
    constructor(private http: HttpClient){}

    salvar(medicamento: Medicameto){
        return this.http.post(API_URL + 'medicamentos', medicamento);
    }

}