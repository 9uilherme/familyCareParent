import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Consulta, Membro, Profissional } from '../consulta';
import { ConsultaService } from './../consulta.service';

@Component({
  selector: 'app-consulta-form',
  templateUrl: './nova-consulta.component.html',
  styleUrls: ['./nova-consulta.component.css']
})
export class NovaConsultaComponent implements OnInit {

  consultaForm: FormGroup;
  message: any = {};
  classCss: any = {};
  submitted: boolean = false;
  consulta: Consulta;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private consultaService: ConsultaService
  ) {
    this.consulta = new Consulta();
    this.consulta.membro = new Membro();
    this.consulta.profissional = new Profissional();
  }

  ngOnInit(): void {
    let id: number = this.route.snapshot.params['id'];
    if (id > 0) {
      this.consultarPorId(id);
    }
    this.consultaForm = this.formBuilder.group({
      membro: ['',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255)
        ]
      ],
      profissional: ['',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255)
        ]
      ]
    });

  }
  consultarPorId(id: number) {
    console.log(id);
  }
  salvar() {
    this.submitted = true;
    this.consultaService.salvar(this.consulta).
      subscribe(
        res => console.log(res),
        exception => console.log(exception))
  }

  get f() {
    return this.consultaForm.controls;
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = { 'alert': true }
    this.classCss['alert-' + type] = true;
  }

}
