import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { MedicamentoService } from '../medicamento.service';
import { Medicamento } from '../medicamento';

@Component({
  selector: 'app-list-medicamento',
  templateUrl: './list-medicamento.component.html',
  styleUrls: ['./list-medicamento.component.css']
})
export class ListMedicamentoComponent implements OnInit {

  page:number=0;
  count:number=5;
  pages:Array<number>;
  message : {};
  classCss : {};
  medicamentoList:Medicamento[]= [];
  nomeFilter:string = ''
  
  constructor(
    private dialogService: DialogService,
    private medicamentoService: MedicamentoService,
    private router: Router) {}

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos(){
    this.medicamentoService.listarTodos().subscribe((list:Medicamento[]) => {
      this.medicamentoList = list;
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
    this.router.navigate(['principal/novo-medicamento',id]);
  }

  delete(id:string){
    this.dialogService.confirm('Você realmente quer deletar esse registro?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.medicamentoService.delete(id).subscribe(() => {
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
