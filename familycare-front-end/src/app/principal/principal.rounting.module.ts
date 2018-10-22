import { ConsultaComponent } from './consulta/consulta.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from './principal.component';
import { NovoMedicamentoComponent } from './novo-medicamento/novo-medicamento.component';
import { AuthGuardPricipal } from '../core/auth/auth-principal.guard';

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
      }
    ]
  } 
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrincipalRoutingModule{}