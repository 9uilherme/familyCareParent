import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { Medicamento } from '../medicamento';
import { MedicamentoService } from '../medicamento.service';

@Component({
  templateUrl: './novo-medicamento.component.html'
})
export class NovoMedicamentoComponent implements OnInit {

  medicamentoForm: FormGroup;
  message:any = {};
  classCss:any = {};
  submited:boolean = false;
  unidades:string[] = [];
  intervalos:string[] = [];
  medicamento:Medicamento;
  @ViewChild('inputNome') inputNome: ElementRef<HTMLInputElement>;

  constructor(
      private formBuilder: FormBuilder,
      private medicamentoService: MedicamentoService,
      private router: Router,
      private route: ActivatedRoute,
      private platformDetectorService: PlatformDetectorService
    ){
      this.medicamento = new Medicamento();
    }

    ngOnInit(): void {
      let id:number = this.route.snapshot.params['id'];
      if(id > 0){
        this.consultarPorId(id);
      }

      this.medicamentoForm = this.formBuilder.group({
          nome: ['',
              [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(255)
              ]
          ],
          dosagem: ['',
              [
                Validators.required
              ]
          ],
          unidade: ['',
              [
                Validators.required
              ]
          ],
          quantidadeDias: ['',
              [
                Validators.required
              ]
          ],
          intervalo: ['',
              [
                Validators.required
              ]
          ],
          data: [new Date(),
              [
                Validators.required
              ]
          ],
          hora: [new Date(),
              [
                Validators.required
              ]
          ],
          lembrete: [true,
              [
                Validators.required
              ]
          ]
      });

      if(this.platformDetectorService.isPlatformBrowser){
          this.inputNome.nativeElement.focus();
      }

      this.listarUnidades();
      this.listarIntervalos();
  }

  listarUnidades(){
    this.medicamentoService.listarUnidades().subscribe((unidades:string[]) => {
      this.unidades = unidades;
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  listarIntervalos(){
    this.medicamentoService.listarIntervalos().subscribe((intervalos:string[]) => {
      this.intervalos = intervalos;
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  consultarPorId(id:number){
    this.medicamentoService.consultarPorId(id).subscribe((medicamento:any) => {
      this.medicamento = medicamento;
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  get f() { 
      return this.medicamentoForm.controls; 
  }

  salvar(){
      this.submited = true;
      this.medicamentoService.salvar(this.medicamento)
      .subscribe((medicamento: Medicamento) => {
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
