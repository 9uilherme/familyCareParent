import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { Medicamento } from '../medicamento';
import { MedicamentoService } from '../medicamento.service';
import { Membro } from '../../membro/membro';
import { MembroService } from '../../membro/membro.service';

@Component({
  templateUrl: './novo-medicamento.component.html'
})
export class NovoMedicamentoComponent implements OnInit {

  medicamentoForm: FormGroup;
  message:any = {};
  classCss:any = {};
  submited:boolean = false;
  unidades:string[] = [];
  intervalos:number[] = [];
  membros:Membro[] = [];
  @ViewChild('inputNome') inputNome: ElementRef<HTMLInputElement>;

  constructor(
      private formBuilder: FormBuilder,
      private medicamentoService: MedicamentoService,
      private membroService: MembroService,
      private route: ActivatedRoute,
      private platformDetectorService: PlatformDetectorService
    ){}

    ngOnInit(): void {
      this.inicializarFormMedicamento();
      this.listarUnidades();
      this.listarIntervalos();
      this.listarMembros();

      let id:number = this.route.snapshot.params['id'];

      if(id > 0){
        this.consultarPorId(id);
      }

      if(this.platformDetectorService.isPlatformBrowser){
          this.inputNome.nativeElement.focus();
      }
  }

  inicializarFormMedicamento(){
    this.medicamentoForm = this.formBuilder.group({
      id:[],
      nome: ['', [ Validators.required, Validators.minLength(1),Validators.maxLength(255) ]],
      membro: ['', [ Validators.required ]],
      dosagem: ['', [ Validators.required ]],
      unidade: ['', [ Validators.required ]],
      quantidadeDias: ['', [ Validators.required ]],
      intervalo: ['', [ Validators.required ]],
      data: [new Date(), [ Validators.required ]],
      hora: [new Date(), [ Validators.required]],
      lembrete:[true, [ Validators.required ]]
    });
  }

  consultarPorId(id:number){
    this.medicamentoService.consultarPorId(id).subscribe((medicamento:Medicamento) => {
      console.log(medicamento)
      this.medicamentoForm.setValue({
        id: medicamento.id,
        nome: medicamento.nome,
        membro: medicamento.membro,
        dosagem: medicamento.dosagem,
        unidade: medicamento.unidade,
        quantidadeDias: medicamento.quantidadeDias,
        intervalo: medicamento.intervalo,
        data: new Date(medicamento.data),
        hora: this.montarData(medicamento.hora),
        lembrete: medicamento.lembrete
      });
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  montarData(hora:any):Date {
    let horas = hora.split(":");
    let data:Date = new Date();
    data.setHours(horas[0]);
    data.setMinutes(horas[1]);
    data.setSeconds(horas[2]);
    return data;
  }

  compare(m1:Membro, m2:Membro) {
   if(m1 != null && m2 != null){
     return m1.id === m2.id;
   }
   return false;
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
    this.medicamentoService.listarIntervalos().subscribe((intervalos:number[]) => {
      this.intervalos = intervalos;
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  listarMembros(){
    this.membroService.listarTodos().subscribe((membros:Membro[]) => {
      this.membros = membros;
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
      let medicamento = this.medicamentoForm.getRawValue() as Medicamento;
      this.medicamentoService.salvar(medicamento)
      .subscribe((medicamento: Medicamento) => {
        this.medicamentoForm.reset({
          data: new Date(),
          hora: new Date(),
        });
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
