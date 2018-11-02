import { FormsModule } from '@angular/forms';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Consulta } from './consulta';
import { ConsultaService } from './consulta.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  providers: [
    FormsModule
  ]
})
export class ConsultaComponent implements OnInit {

  consultas: Consulta[] = new Array();

  pagina:number=0;
  tamanho:number=5;
  paginas:Array<number>;
  message : {};
  classCss : {};
  nomeFilter:string = ''
  filtro: Consulta;
  constructor(private consultaService: ConsultaService,
    private dialogService: DialogService,
    private router: Router) {
      this.filtro = new Consulta();
  }
  
  ngOnInit() {
    this.consultaService.listar().subscribe(
      (resp: any) => this.consultas = resp);

  }

  listarComPaginacao(pagina:number,tamanho:number){
    this.consultaService.listarComPaginacao(pagina,tamanho).subscribe((resposta:any) => {
      this.consultas = resposta.content;
      this.paginas = new Array(resposta.totalPages);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  listarComFiltro(){
    this.consultaService.listarComFiltro(this.pagina,this.tamanho,this.nomeFilter).subscribe((resposta:any) => {
      this.consultas = resposta.content;
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
  this.router.navigate(['principal/novo-medicamento',id]);
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
