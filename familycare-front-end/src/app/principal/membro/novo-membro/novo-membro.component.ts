import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Membro } from '../membro';
import { MembroService } from '../membro.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  selector: 'app-novo-membro',
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
  membro:Membro;
  @ViewChild('inputNome') inputNome: ElementRef<HTMLInputElement>;

  constructor(
      private formBuilder: FormBuilder,
      private membroService: MembroService,
      private router: Router,
      private route: ActivatedRoute,
      private platformDetectorService: PlatformDetectorService
    ){
      this.membro = new Membro(0,null,'',0,0,'','','','');
    }

    ngOnInit(): void {
      let id:number = this.route.snapshot.params['id'];
      if(id > 0){
        this.consultarPorId(id);
      }

      this.membroForm = this.formBuilder.group({
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
          peso: [0.00,
              [
                Validators.required
              ]
          ],
          altura: [0.00,
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

      if(this.platformDetectorService.isPlatformBrowser){
          this.inputNome.nativeElement.focus();
      }

      this.listarSexos();
      this.listarTiposSanguineos();
      this.listarFatoresRh();
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

  consultarPorId(id:number){
    this.membroService.consultarPorId(id).subscribe((membro:any) => {
      this.membro = membro;
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
      this.membroService.salvar(this.membro)
      .subscribe((membro: Membro) => {
        this.membroForm.reset();
        this.submited = false;
        this.membro = new Membro(0,null,'',0,0,'','','','');
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