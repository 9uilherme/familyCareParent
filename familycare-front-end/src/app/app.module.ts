import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core/core.module';
import { ErrorsModule } from './errors/errors.module';
import { PrincipalModule } from './principal/principal.module';
import { DialogService } from './shared/services/dialog.service';

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
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
