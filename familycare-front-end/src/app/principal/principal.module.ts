import { NovaConsultaComponent } from './consulta/nova-consulta/nova-consulta.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule, TimepickerModule} from 'ngx-bootstrap';

import { ConsultaService } from './consulta/consulta.service';
import { ConsultaComponent } from './consulta/consulta.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { PrincipalComponent } from './principal.component';
import { PrincipalRoutingModule } from './principal.rounting.module';
import { VmessageModule } from '../shared/components/vmessage/vmessage.module';
import { CoreModule } from '../core/core.module';
import { ListMedicamentoComponent } from './medicamento/list-medicamento/list-medicamento.component';
import { NovoMedicamentoComponent } from './medicamento/novo-medicamento/novo-medicamento.component';
import { MedicamentoService } from './medicamento/medicamento.service';
import { NovoMembroComponent } from './membro/novo-membro/novo-membro.component';
import { ListMembroComponent } from './membro/list-membro/list-membro.component';
import { MembroService } from './membro/membro.service';
import {NgxMaskModule} from 'ngx-mask'

@NgModule({
    declarations:[
        PrincipalComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        NovoMedicamentoComponent,
        ConsultaComponent,
        ListMedicamentoComponent,
        NovoMembroComponent,
        ListMembroComponent
        NovaConsultaComponent
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        RouterModule,
        PrincipalRoutingModule,
        ReactiveFormsModule,
        FormsModule, 
        VmessageModule,
        CoreModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        NgxMaskModule.forRoot()
    ],
    providers:[
        MedicamentoService,
        MembroService,
        ConsultaService
    ]
})
export class PrincipalModule{}