import { ConsultaService } from './consulta.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta.component';
import { ConsultaFormComponent } from './consulta-form/consulta-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ConsultaComponent,
    ConsultaFormComponent
  ],
  providers: [
    ConsultaService
  ]
})
export class ConsultaModule { }
