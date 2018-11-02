import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { CoreModule } from '../core/core.module';
import { VmessageModule } from '../shared/components/vmessage/vmessage.module';
import { ConsultaComponent } from './consulta/consulta.component';
import { ConsultaService } from './consulta/consulta.service';
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
import { PerfilUsuarioComponent } from './usuario/perfil-usuario/perfil-usuario.component'
import { UsuarioService } from './usuario/usuario.service';


@NgModule({
    declarations:[
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        PerfilUsuarioComponent,
        PrincipalComponent,
        NovoMedicamentoComponent,
        ConsultaComponent,
        ListMedicamentoComponent,
        NovoMembroComponent,
        ListMembroComponent,
        NovaConsultaComponent
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        RouterModule,
        PrincipalRoutingModule,
        ReactiveFormsModule,
        VmessageModule,
        CoreModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        NgxMaskModule.forRoot(),
        FormsModule
    ],
    providers:[
        MedicamentoService,
        MembroService,
        ConsultaService,
        UsuarioService
    ]
})
export class PrincipalModule{}