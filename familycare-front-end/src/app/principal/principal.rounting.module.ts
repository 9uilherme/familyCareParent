import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from './principal.component';
import { AuthGuardPricipal } from '../core/auth/auth-principal.guard';
import { NovaConsultaComponent } from './consulta/nova-consulta/nova-consulta.component';
import { NovoMedicamentoComponent } from './medicamento/novo-medicamento/novo-medicamento.component';
import { ListMedicamentoComponent } from './medicamento/list-medicamento/list-medicamento.component';
import { NovoMembroComponent } from './membro/novo-membro/novo-membro.component';
import { ListMembroComponent } from './membro/list-membro/list-membro.component';
import { PerfilUsuarioComponent } from './usuario/perfil-usuario/perfil-usuario.component';
import { NovoProfissionalComponent } from './profissional/novo-profissional/novo-profissional.component';
import { ListProfissionalComponent } from './profissional/list-profissional/list-profissional.component';
import { ListConsultaComponent } from './consulta/list-consulta/list-consulta.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent, canActivate: [AuthGuardPricipal],
    children:[
      { path: 'novo-medicamento', component: NovoMedicamentoComponent },
      { path: 'novo-medicamento/:id', component: NovoMedicamentoComponent },
      { path: 'list-medicamento', component: ListMedicamentoComponent },
      
      { path: 'novo-membro', component: NovoMembroComponent },
      { path: 'novo-membro/:id', component: NovoMembroComponent },
      { path: 'list-membro', component: ListMembroComponent },
      
      { path: 'nova-consulta/:id', component: NovaConsultaComponent },
      { path: 'nova-consulta', component: NovaConsultaComponent },
      { path: 'list-consulta', component: ListConsultaComponent },
      
      { path: 'novo-profissional', component: NovoProfissionalComponent },
      { path: 'novo-profissional/:id', component: NovoProfissionalComponent },
      { path: 'list-profissional', component: ListProfissionalComponent },

      { path: 'perfil-usuario', component: PerfilUsuarioComponent },
    ]
  } 
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrincipalRoutingModule{}