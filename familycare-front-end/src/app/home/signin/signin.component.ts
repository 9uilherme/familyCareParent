import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

    loginForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuild: FormBuilder, 
        private authService: AuthService, 
        private router: Router,
        private platformDetectorService: PlatformDetectorService
        ){}

    ngOnInit(): void {
        this.loginForm = this.formBuild.group({
            email:['admin@familycare.com', Validators.required],
            password:['123456', Validators.required]
        });
        if(this.platformDetectorService.isPlatformBrowser){
            this.emailInput.nativeElement.focus();
        }
    }

    login(){
        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password').value;

        this.authService
        .authenticate(email,password)
        .subscribe(
            () => this.router.navigate(['principal']),
            err => {
                console.log(err);
                this.loginForm.reset();
                alert("E-mail ou senha inválidos!"); //TODO Colocar no componente de mensagem...
                if(this.platformDetectorService.isPlatformBrowser){
                    this.emailInput.nativeElement.focus();
                }
        });
    }

}