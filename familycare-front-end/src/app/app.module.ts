import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ErrorsModule } from './errors/errors.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing.module';
import { PrincipalModule } from './principal/principal.module';
import { DialogService } from './shared/services/dialog.service';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrincipalModule,
    ErrorsModule,
    CoreModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    DialogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
