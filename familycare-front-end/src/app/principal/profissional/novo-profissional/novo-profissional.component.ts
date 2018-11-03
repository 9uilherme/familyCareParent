import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { Profissional } from '../profissional';
import { ProfissionalService } from '../profissional.service';

@Component({
  templateUrl: './novo-profissional.component.html',
  styleUrls: ['./novo-profissional.component.css']
})
export class NovoProfissionalComponent implements OnInit {

  profissionalForm: FormGroup;
  message:any = {};
  classCss:any = {};
  submited:boolean = false;
  @ViewChild('inputNome') inputNome: ElementRef<HTMLInputElement>;

  constructor(
      private formBuilder: FormBuilder,
      private profissionalService: ProfissionalService,
      private route: ActivatedRoute,
      private platformDetectorService: PlatformDetectorService
    ){}

    ngOnInit(): void {
      this.inicialiarProficionalForm();
      let id:number = this.route.snapshot.params['id'];

      if(id > 0){
        this.consultarPorId(id);
      }

      if(this.platformDetectorService.isPlatformBrowser){
          this.inputNome.nativeElement.focus();
      }
  }

  inicialiarProficionalForm(){
      this.profissionalForm = this.formBuilder.group({
        id:[],
        nome: ['', [ Validators.required, Validators.minLength(1), Validators.maxLength(255) ]],
        email: ['', [ Validators.required, Validators.maxLength(255), Validators.email ]],
        especialidade: ['', [ Validators.maxLength(255) ]],
        telefoneCelular: ['', [ Validators.maxLength(255) ]],
        telefoneFixo: ['', [ Validators.maxLength(255) ]],
        endereco: ['',[ Validators.maxLength(255) ]]
    });
  }

  consultarPorId(id:number){
    this.profissionalService.consultarPorId(id).subscribe((profissional:Profissional) => {
      this.preencherProfissionalForm(profissional);
    } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  preencherProfissionalForm(profissional:Profissional){
    this.profissionalForm.setValue({
      id: profissional.id,
      nome: profissional.nome,
      email:profissional.email,
      especialidade: profissional.especialidade,
      telefoneCelular: profissional.telefoneCelular,
      telefoneFixo: profissional.telefoneFixo,
      endereco: profissional.endereco
    });
  }

 get f() { 
    return this.profissionalForm.controls; 
 }

  salvar(){ 
      this.submited = true;
      let profissional = this.profissionalForm.getRawValue() as Profissional;
      this.profissionalService.salvar(profissional)
      .subscribe((profissional: Profissional) => {
        this.profissionalForm.reset();
        this.submited = false;
        this.showMessage({
          type: 'success',
          text: `Registered ${profissional.nome} successfully`
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
