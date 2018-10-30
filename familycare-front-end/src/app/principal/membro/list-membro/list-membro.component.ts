import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Membro } from '../membro';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { MembroService } from '../membro.service';

@Component({
  selector: 'app-list-membro',
  templateUrl: './list-membro.component.html',
  styleUrls: ['./list-membro.component.css']
})
export class ListMembroComponent implements OnInit {

  page:number=0;
  count:number=5;
  pages:Array<number>;
  message : {};
  classCss : {};
  membroList:Membro[]= [];
  nomeFilter:string = ''
  
  constructor(
    private dialogService: DialogService,
    private membroService: MembroService,
    private router: Router) {}

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos(){
    this.membroService.listarTodos().subscribe((list:Membro[]) => {
      this.membroList = list;
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  limparFiltros(): void {
    this.page = 0;
    this.count = 5;
    this.nomeFilter = null;
    this.listarTodos();
  }

  edit(id:string){
    this.router.navigate(['principal/novo-membro',id]);
  }

  delete(id:string){
    this.dialogService.confirm('Você realmente quer deletar esse registro?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.membroService.delete(id).subscribe(() => {
                this.showMessage({
                  type: 'success',
                  text: `Record deleted`
                });
                this.listarTodos();
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
    if(this.page+1 < this.pages.length){
      this.page =  this.page +1;
      this.listarTodos();
    }
  }

  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0){
      this.page =  this.page - 1;
      this.listarTodos();
    }
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.listarTodos();
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

