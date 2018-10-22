import { ConsultaService } from './consulta.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ConsultaComponent
  ],
  providers: [
    ConsultaService
  ]
})
export class ConsultaModule { }
