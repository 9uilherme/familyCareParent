import { ConsultaService } from './consulta/consulta.service';
import { ConsultaComponent } from './consulta/consulta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { PrincipalComponent } from './principal.component';
import { RouterModule } from '@angular/router';
import { NovoMedicamentoComponent } from './novo-medicamento/novo-medicamento.component';
import { PrincipalRoutingModule } from './principal.rounting.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VmessageModule } from '../shared/components/vmessage/vmessage.module';
import { NovoMedicamentoService } from './novo-medicamento/novo-medicamento.service';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';

@NgModule({
    declarations:[
        PrincipalComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        NovoMedicamentoComponent,
        ConsultaComponent
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
    ],
    providers:[
        NovoMedicamentoService,
        ConsultaService
    ]
})
export class PrincipalModule{}