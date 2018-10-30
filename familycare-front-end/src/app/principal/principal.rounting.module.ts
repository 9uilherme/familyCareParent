import { ConsultaComponent } from './consulta/consulta.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from './principal.component';
import { AuthGuardPricipal } from '../core/auth/auth-principal.guard';
import { NovoMedicamentoComponent } from './medicamento/novo-medicamento/novo-medicamento.component';
import { ListMedicamentoComponent } from './medicamento/list-medicamento/list-medicamento.component';
import { NovoMembroComponent } from './membro/novo-membro/novo-membro.component';
import { ListMembroComponent } from './membro/list-membro/list-membro.component';

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
        path: 'novo-membro', 
        component: NovoMembroComponent
      },
      {
        path: 'novo-membro/:id', 
        component: NovoMembroComponent
      },
      {
        path: 'list-membro', 
        component: ListMembroComponent
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