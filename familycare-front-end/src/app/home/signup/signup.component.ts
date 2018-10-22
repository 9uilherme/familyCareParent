import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioNaoDisponivelValidatorService } from './usuario-nao-disponivel.validator.service';
import { NovoUsuario } from './novo-usuario';
import { SignUpService } from './signup.service';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
    templateUrl:'./signup.component.html',
    providers:[UsuarioNaoDisponivelValidatorService]
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UsuarioNaoDisponivelValidatorService,
        private signUpService: SignUpService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService
        ){ }

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ],
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            nome: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50)
                ]
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(14)
                ]
            ]
        });

        if(this.platformDetectorService.isPlatformBrowser){
            this.emailInput.nativeElement.focus();
        }
    }

    signup(){
        const novoUsuario = this.signupForm.getRawValue() as NovoUsuario;
        novoUsuario.perfil = 'USUARIO';
        this.signUpService
        .signup(novoUsuario)
        .subscribe(
            () => this.router.navigate(['']),
            err => console.log(err)
        );
    }

}