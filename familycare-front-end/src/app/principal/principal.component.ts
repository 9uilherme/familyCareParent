import { Component, OnInit } from '@angular/core';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

defineLocale('pt-br', ptBrLocale); 
declare var $:any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html'
})
export class PrincipalComponent implements OnInit{

  constructor(
    private localeService: BsLocaleService
  ){
    localeService.use('pt-br');
  }

  ngOnInit() {
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
  }

}