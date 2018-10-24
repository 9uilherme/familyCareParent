import { API_URL } from '../../ambiente/ambiente';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicamento } from './medicamento';

@Injectable()
export class NovoMedicamentoService {
    
    constructor(private http: HttpClient){}

    salvar(medicamento: Medicamento){
        return this.http.post(API_URL + 'medicamentos', medicamento);
    }

}