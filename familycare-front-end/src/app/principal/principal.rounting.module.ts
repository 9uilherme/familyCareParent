import { ConsultaComponent } from './consulta/consulta.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from './principal.component';
import { NovoMedicamentoComponent } from './novo-medicamento/novo-medicamento.component';
import { AuthGuardPricipal } from '../core/auth/auth-principal.guard';
import { NovaConsultaComponent } from './consulta/nova-consulta/nova-consulta.component';

const routes: Routes = [
  {
    path: '', 
    component: PrincipalComponent,
    canActivate: [AuthGuardPricipal],
    children:[
      {
        path: 'novo-medicamento', 
        component: NovoMedicamentoComponent
      },
      {
        path: 'consulta', 
        component: ConsultaComponent
      },
      {
        path: 'consulta/:id',
        component: NovaConsultaComponent
      },
      {
        path: 'nova-consulta',
        component: NovaConsultaComponent
      }
    ]
  } 
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrincipalRoutingModule{}