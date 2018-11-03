import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Router } from '@angular/router';
import { Consulta } from '../consulta';
import { ConsultaService } from '../consulta.service';

  @Component({
    templateUrl: './list-consulta.component.html'
  })
  export class ListConsultaComponent implements OnInit {
  
    pagina:number=0;
    tamanho:number=5;
    paginas:Array<number>;
    message : {};
    classCss : {};
    consultaList:Consulta[]= [];
    descricaoFilter:string = ''
    
    constructor(
      private dialogService: DialogService,
      private consultaService: ConsultaService,
      private router: Router) {}
  
      ngOnInit() {
        this.listarComPaginacao(this.pagina,this.tamanho);
      }
  
      listarComPaginacao(pagina:number,tamanho:number){
        this.consultaService.listarComPaginacao(pagina,tamanho).subscribe((resposta:any) => {
          this.consultaList = resposta.content;
          this.paginas = new Array(resposta.totalPages);
        } , err => {
          this.showMessage({
            type: 'error',
            text: err['error']['errors'][0]
          });
        });
      }
  
      listarComFiltro(){
        this.consultaService.listarComFiltro(this.pagina,this.tamanho,this.descricaoFilter).subscribe((resposta:any) => {
          this.consultaList = resposta.content;
          this.paginas = new Array(resposta.totalPages);
        } , err => {
          this.showMessage({
            type: 'error',
            text: err['error']['errors'][0]
          });
        });
      }
  
      limparFiltros(): void {
        this.pagina = 0;
        this.tamanho = 5;
        this.descricaoFilter = null;
        this.listarComPaginacao(this.pagina,this.tamanho);
      }
  
    edit(id:string){
      this.router.navigate(['principal/nova-consulta',id]);
    }
  
    delete(id:string){
      this.dialogService.confirm('Você realmente quer deletar esse registro?')
        .then((candelete:boolean) => {
            if(candelete){
              this.message = {};
              this.consultaService.delete(id).subscribe(() => {
                  this.showMessage({
                    type: 'success',
                    text: `Record deleted`
                  });
                  this.listarComPaginacao(this.pagina,this.tamanho);
              } , err => {
                this.showMessage({
                  type: 'error',
                  text: err['error']['errors'][0]
                });
              });
            }
        });
    }
  
    setNextPage(event:any){
      event.preventDefault();
      if(this.pagina+1 < this.paginas.length){
        this.pagina =  this.pagina +1;
        this.listarComPaginacao(this.pagina,this.tamanho);
      }
    }
  
    setPreviousPage(event:any){
      event.preventDefault();
      if(this.pagina > 0){
        this.pagina =  this.pagina - 1;
        this.listarComPaginacao(this.pagina,this.tamanho);
      }
    }
  
    setPage(i,event:any){
      event.preventDefault();
      this.pagina = i;
      this.listarComPaginacao(this.pagina,this.tamanho);
    }
  
    private showMessage(message: {type: string, text: string}): void {
      this.message = message;
      this.buildClasses(message.type);
      setTimeout(() => {
        this.message = undefined;
      }, 3000);
    }
  
    private buildClasses(type: string): void {
      this.classCss = {
        'alert': true
      }
      this.classCss['alert-'+type] =  true;
    }
    
  }
  