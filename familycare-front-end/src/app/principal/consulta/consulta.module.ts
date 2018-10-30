import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConsultaComponent } from './consulta.component';
import { ConsultaService } from './consulta.service';
import { NovaConsultaComponent } from './nova-consulta/nova-consulta.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ConsultaComponent,
    NovaConsultaComponent
  ],
  providers: [
    ConsultaService
  ]
})
export class ConsultaModule { }
