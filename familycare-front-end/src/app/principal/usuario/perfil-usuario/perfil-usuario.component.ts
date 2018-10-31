import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { Usuario } from '../usuario';
import { UserService } from 'src/app/core/user/user.service';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/core/user/user';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  perfilUsuarioForm: FormGroup;
  message:any = {};
  classCss:any = {};
  submited:boolean = false;
  @ViewChild('inputNome') inputNome: ElementRef<HTMLInputElement>;
  
    constructor(
        private formBuilder: FormBuilder,
        private usuarioService: UsuarioService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private platformDetectorService: PlatformDetectorService,
        private cd: ChangeDetectorRef
      ){}
  
      ngOnInit(): void {
        this.inicializarPerfilUsuarioForm();
        this.carregarPerfilUsuarioForm();
        if(this.platformDetectorService.isPlatformBrowser){
            this.inputNome.nativeElement.focus();
        }
    }

    inicializarPerfilUsuarioForm(){
      this.perfilUsuarioForm = this.formBuilder.group({
        id:[],
        nome: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
        password: ['' ,[Validators.minLength(6), Validators.maxLength(14)]],
        imagemPerfil: [null],
        perfil: [null],
        email: [null]
    });
  }

  carregarPerfilUsuarioForm(){
      let email = this.userService.getUserName();
      this.usuarioService.consultarPorEmail(email).subscribe((usuario:Usuario) => {
        this.preencherPerfilUsuarioForm(usuario);
      } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }
  
  preencherPerfilUsuarioForm(usuario:Usuario){
    this.perfilUsuarioForm.patchValue({
      id: usuario.id,
      nome: usuario.nome,
      imagemPerfil: usuario.imagemPerfil,
      perfil: usuario.perfil,
      email: usuario.email
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.perfilUsuarioForm.patchValue({
          imagemPerfil: reader.result
       });
      
        this.cd.markForCheck();
      };
    }
  }
  
   get f() { 
      return this.perfilUsuarioForm.controls; 
   }
  
    salvar(){ 
        this.submited = true;
        let usuario = this.perfilUsuarioForm.getRawValue() as Usuario;
        this.usuarioService.alterar(usuario)
        .subscribe((usuario: Usuario) => {
          this.submited = false;
          this.showMessage({
            type: 'success',
            text: `Perfil do Usuário ${usuario.nome} atualizado com sucesso!`
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
