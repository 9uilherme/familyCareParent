import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { NgxMaskModule } from 'ngx-mask';
import { CoreModule } from '../core/core.module';
import { VmessageModule } from '../shared/components/vmessage/vmessage.module';
import { ConsultaService } from './consulta/consulta.service';
import { ListConsultaComponent } from './consulta/list-consulta/list-consulta.component';
import { NovaConsultaComponent } from './consulta/nova-consulta/nova-consulta.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ListMedicamentoComponent } from './medicamento/list-medicamento/list-medicamento.component';
import { MedicamentoService } from './medicamento/medicamento.service';
import { NovoMedicamentoComponent } from './medicamento/novo-medicamento/novo-medicamento.component';
import { ListMembroComponent } from './membro/list-membro/list-membro.component';
import { MembroService } from './membro/membro.service';
import { NovoMembroComponent } from './membro/novo-membro/novo-membro.component';
import { MenuComponent } from './menu/menu.component';
import { PrincipalComponent } from './principal.component';
import { PrincipalRoutingModule } from './principal.rounting.module';
import { ListProfissionalComponent } from './profissional/list-profissional/list-profissional.component';
import { NovoProfissionalComponent } from './profissional/novo-profissional/novo-profissional.component';
import { ProfissionalService } from './profissional/profissional.service';
import { PerfilUsuarioComponent } from './usuario/perfil-usuario/perfil-usuario.component';
import { UsuarioService } from './usuario/usuario.service';
import { ModalContentComponent } from './membro/novo-membro/modal-content-component';


@NgModule({
    declarations:[
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        PerfilUsuarioComponent,
        PrincipalComponent,
        NovoMedicamentoComponent,
        NovaConsultaComponent,
        ListConsultaComponent,
        ListMedicamentoComponent,
        NovoMembroComponent,
        ListMembroComponent,
        NovaConsultaComponent,
        NovoProfissionalComponent,
        ListProfissionalComponent,
        ModalContentComponent
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        RouterModule,
        PrincipalRoutingModule,
        ReactiveFormsModule,
        VmessageModule,
        CoreModule,
        FormsModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        NgxMaskModule.forRoot(),
        ModalModule.forRoot()
    ],
    providers:[
        UsuarioService,
        ConsultaService,
        MedicamentoService,
        MembroService,
        ProfissionalService,
        BsModalService,
        BsModalRef
    ],
    entryComponents: [
        ModalContentComponent,
        NovoMembroComponent
    ]
})
export class PrincipalModule{}