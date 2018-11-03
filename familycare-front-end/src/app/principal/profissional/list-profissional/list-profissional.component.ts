import { Component, OnInit } from '@angular/core';
import { Profissional } from '../profissional';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ProfissionalService } from '../profissional.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-profissional',
  templateUrl: './list-profissional.component.html',
  styleUrls: ['./list-profissional.component.css']
})
export class ListProfissionalComponent implements OnInit {

  pagina:number=0;
  tamanho:number=5;
  paginas:Array<number>;
  message : {};
  classCss : {};
  profissionalList:Profissional[]= [];
  nomeFilter:string = ''
  
  constructor(
    private dialogService: DialogService,
    private profissionalService: ProfissionalService,
    private router: Router) {}

  ngOnInit() {
    this.listarComPaginacao(this.pagina,this.tamanho);
  }

  listarComPaginacao(pagina:number,tamanho:number){
    this.profissionalService.listarComPaginacao(pagina,tamanho).subscribe((resposta:any) => {
      this.profissionalList = resposta.content;
      this.paginas = new Array(resposta.totalPages);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  listarComFiltro(){
    this.profissionalService.listarComFiltro(this.pagina,this.tamanho,this.nomeFilter).subscribe((resposta:any) => {
      this.profissionalList = resposta.content;
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
    this.nomeFilter = null;
    this.listarComPaginacao(this.pagina,this.tamanho);
  }

  edit(id:string){
    this.router.navigate(['principal/novo-profissional',id]);
  }

  delete(id:string){
    this.dialogService.confirm('Você realmente quer deletar esse registro?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.profissionalService.delete(id).subscribe(() => {
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

