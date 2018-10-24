import { ConsultaService } from './consulta/consulta.service';
import { ConsultaComponent } from './consulta/consulta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { PrincipalComponent } from './principal.component';
import { RouterModule } from '@angular/router';
import { PrincipalRoutingModule } from './principal.rounting.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VmessageModule } from '../shared/components/vmessage/vmessage.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { ListMedicamentoComponent } from './medicamento/list-medicamento/list-medicamento.component';
import { NovoMedicamentoComponent } from './medicamento/novo-medicamento/novo-medicamento.component';
import { MedicamentoService } from './medicamento/medicamento.service';
import { BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';

@NgModule({
    declarations:[
        PrincipalComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        NovoMedicamentoComponent,
        ConsultaComponent,
        ListMedicamentoComponent
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
        TimepickerModule.forRoot()
    ],
    providers:[
        MedicamentoService,
        ConsultaService
    ]
})
export class PrincipalModule{}