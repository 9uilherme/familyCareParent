import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { Membro } from '../membro';
import { MembroService } from '../membro.service';

@Component({
  templateUrl: './novo-membro.component.html',
  styleUrls: ['./novo-membro.component.css']
})
export class NovoMembroComponent implements OnInit {

  membroForm: FormGroup;
  message:any = {};
  classCss:any = {};
  submited:boolean = false;
  sexos:string[] = [];
  tiposSanguineos:string[] = [];
  fatoresRh:string[] = [];
  modalParam : boolean = false;

  @ViewChild('inputNome') inputNome: ElementRef<HTMLInputElement>;
  constructor(
      private formBuilder: FormBuilder,
      private membroService: MembroService,
      private route: ActivatedRoute,
      private platformDetectorService: PlatformDetectorService,
      public bsModalRef: BsModalRef
    ){}

    ngOnInit(): void {
      this.inicialiarMembroForm();
      let id:number = this.route.snapshot.params['id'];

      if(id > 0){
        this.consultarPorId(id);
      }

      if(this.platformDetectorService.isPlatformBrowser){
          this.inputNome.nativeElement.focus();
      }

      this.listarSexos();
      this.listarTiposSanguineos();
      this.listarFatoresRh();
  }

  inicialiarMembroForm(){
      this.membroForm = this.formBuilder.group({
        id:[],
        nome: ['',
            [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(255)
            ]
        ],
        dataNascimento: ['',
            [
              Validators.required
            ]
        ],
        peso: ['',
            [
              Validators.required
            ]
        ],
        altura: ['',
            [
              Validators.required
            ]
        ],
        sexo: ['',
            [
              Validators.required
            ]
        ],
        tipoSanguineo: ['',
        [
          Validators.nullValidator
        ]
      ],
      fatorRH: ['',
        [
          Validators.nullValidator
        ]
      ]
    });
  }

  consultarPorId(id:number){
    this.membroService.consultarPorId(id).subscribe((membro:Membro) => {
      this.preencherMembroForm(membro);
    } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  preencherMembroForm(membro:Membro){
    this.membroForm.setValue({
      id: membro.id,
      nome: membro.nome,
      dataNascimento: new Date(membro.dataNascimento),
      peso: membro.peso,
      altura: membro.altura,
      sexo: membro.sexo,
      tipoSanguineo: membro.tipoSanguineo,
      fatorRH: membro.fatorRH
    });
  }

  listarSexos(){
    this.membroService.listarSexos().subscribe((sexos:string[]) => {
      this.sexos = sexos;
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  listarTiposSanguineos(){
    this.membroService.listarTiposSanguineos().subscribe((tiposSanguineos:string[]) => {
      this.tiposSanguineos = tiposSanguineos;
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  listarFatoresRh(){
    this.membroService.listarFatoresRh().subscribe((fatoresRh:string[]) => {
      this.fatoresRh = fatoresRh;
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

 get f() { 
    return this.membroForm.controls; 
 }

  salvar(){ 
      this.submited = true;
      let membro = this.membroForm.getRawValue() as Membro;
      this.membroService.salvar(membro)
      .subscribe((membro: Membro) => {
        this.membroForm.reset();
        this.submited = false;
        this.showMessage({
          type: 'success',
          text: `Registered ${membro.nome} successfully`
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