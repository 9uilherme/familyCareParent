import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { NovoMedicamentoService } from './novo-medicamento.service';
import { Medicameto } from './medicamento';

@Component({
  templateUrl: './novo-medicamento.component.html'
})
export class NovoMedicamentoComponent implements OnInit {

  medicamentoForm: FormGroup;
  message:any = {};
  classCss:any = {};
  submited:boolean = false;
  @ViewChild('inputNome') inputNome: ElementRef<HTMLInputElement>;

  constructor(
      private formBuilder: FormBuilder,
      private novoMedicamentoService: NovoMedicamentoService,
      private router: Router,
      private platformDetectorService: PlatformDetectorService
    ){ }

    ngOnInit(): void {
      this.medicamentoForm = this.formBuilder.group({
          nome: ['',
              [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(255)
              ]
          ]
      });

      if(this.platformDetectorService.isPlatformBrowser){
          this.inputNome.nativeElement.focus();
      }
  }

  get f() { 
      return this.medicamentoForm.controls; 
  }

  salvar(){
      this.submited = true;
      const novoMedicamento = this.medicamentoForm.getRawValue() as Medicameto;
      this.novoMedicamentoService.salvar(novoMedicamento)
      .subscribe((medicamento: Medicameto) => {
        this.medicamentoForm.reset();
        this.submited = false;
        this.showMessage({
          type: 'success',
          text: `Registered ${medicamento.nome} successfully`
        });
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'] != undefined 
        ? err['error']['errors'][0] 
        : err['error'].message
      });
    });
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

  private showMessage(message: {type: string, text: string}): void {
      this.message = message;
      this.buildClasses(message.type);
      setTimeout(() => {
        this.message = undefined;
      }, 3000);
  }

  private buildClasses(type: string): void {
     this.classCss = {'alert': true}
     this.classCss['alert-'+type] = true;
  }

}
