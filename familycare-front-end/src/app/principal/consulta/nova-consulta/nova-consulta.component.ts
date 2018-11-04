import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Profissional } from '../../profissional/profissional';
import { Membro } from '../../membro/membro';
import { ConsultaService } from '../consulta.service';
import { MembroService } from '../../membro/membro.service';
import { ProfissionalService } from '../../profissional/profissional.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { Consulta } from '../consulta';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { NovoMembroComponent } from '../../membro/novo-membro/novo-membro.component';
import { NovoProfissionalComponent } from '../../profissional/novo-profissional/novo-profissional.component';

@Component({
  templateUrl: './nova-consulta.component.html',
  styleUrls: ['./nova-consulta.component.css']
})
export class NovaConsultaComponent implements OnInit {
  
    consultaForm: FormGroup;
    message:any = {};
    classCss:any = {};
    submited:boolean = false;
    membros:Membro[] = [];
    profissionais:Profissional[] = [];
    bsModalRef: BsModalRef;    

    @ViewChild('inputDescricao') inputDescricao: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private consultaService: ConsultaService,
        private membroService: MembroService,
        private profissionalService: ProfissionalService,
        private route: ActivatedRoute,
        private platformDetectorService: PlatformDetectorService,
        private modalService: BsModalService
      ){}
  
      ngOnInit(): void {
        this.inicializarFormProfissional();
        this.listarMembros();
        this.listarProfissionais();
  
        let id:number = this.route.snapshot.params['id'];
  
        if(id > 0){
          this.consultarPorId(id);
        }
  
        if(this.platformDetectorService.isPlatformBrowser){
            this.inputDescricao.nativeElement.focus();
        }
    }
  
    public openModalMembro() {
      const initialState = {
        modalParam: true
      };
      this.bsModalRef = this.modalService.show(NovoMembroComponent, {initialState});
      this.bsModalRef.content.closeBtnName = 'Close';
    }
    public openModalProfissional() {
      const initialState = {
        modalParam: true
      };
      this.bsModalRef = this.modalService.show(NovoProfissionalComponent, {initialState});
      this.bsModalRef.content.closeBtnName = 'Close';
    }
  
    inicializarFormProfissional(){
      this.consultaForm = this.formBuilder.group({
        id:[],
        descricao: ['', [ Validators.required, Validators.minLength(1),Validators.maxLength(255) ]],
        membro: ['', [ Validators.required ]],
        profissional: ['', [ Validators.required ]],
        endereco: ['', [ Validators.maxLength(255) ]],
        data: [new Date(), [ Validators.required ]],
        hora: [new Date(), [ Validators.required]],
        lembrete:[true, [ Validators.required ]]
      });
    }
  
    consultarPorId(id:number){
      this.consultaService.consultarPorId(id).subscribe((consulta:Consulta) => {
        this.consultaForm.setValue({
          id: consulta.id,
          descricao: consulta.descricao,
          membro: consulta.membro,
          profissional: consulta.profissional,
          endereco: consulta.endereco,
          data: new Date(consulta.data),
          hora: this.montarData(consulta.hora),
          lembrete: consulta.lembrete
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
  
    compareMembro(m1:Membro, m2:Membro) {
     if(m1 != null && m2 != null){
       return m1.id === m2.id;
     }
     return false;
    }

    compareProfissional(p1:Profissional, p2:Profissional) {
      if(p1 != null && p2 != null){
        return p1.id === p2.id;
      }
      return false;
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

    listarProfissionais(){
      this.profissionalService.listarTodos().subscribe((profissionais:Profissional[]) => {
        this.profissionais = profissionais;
      } , err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
    }
  
    get f() { 
        return this.consultaForm.controls; 
    }
  
    salvar(){
        this.submited = true;
        let consulta = this.consultaForm.getRawValue() as Consulta;
        this.consultaService.salvar(consulta)
        .subscribe((consulta: Consulta) => {
          this.consultaForm.reset({
            data: new Date(),
            hora: new Date(),
          });
          this.submited = false;
          this.showMessage({
            type: 'success',
            text: `Registered ${consulta.descricao} successfully`
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
  