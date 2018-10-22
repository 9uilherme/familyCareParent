import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from './auth/request.interceptor';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule
    ],
    providers:[
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi:true
        }
    ]
})
export class CoreModule{}