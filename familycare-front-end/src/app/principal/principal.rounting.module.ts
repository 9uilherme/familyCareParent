import { ConsultaComponent } from './consulta/consulta.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from './principal.component';
import { AuthGuardPricipal } from '../core/auth/auth-principal.guard';
import { NovoMedicamentoComponent } from './medicamento/novo-medicamento/novo-medicamento.component';
import { ListMedicamentoComponent } from './medicamento/list-medicamento/list-medicamento.component';

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
        path: 'novo-medicamento/:id', 
        component: NovoMedicamentoComponent
      },
      {
        path: 'list-medicamento', 
        component: ListMedicamentoComponent
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