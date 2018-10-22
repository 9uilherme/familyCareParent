import { ConsultaService } from './consulta.service';
import { Component, OnInit } from '@angular/core';
import { Consulta } from './consulta';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  consultas: Consulta[] = new Array();

  constructor(private consultaService: ConsultaService) {

  }
  
  ngOnInit() {
    this.consultaService.listar().subscribe(
      (resp: any) => this.consultas = resp);

  }

}
