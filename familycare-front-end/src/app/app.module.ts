import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ErrorsModule } from './errors/errors.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing.module';
import { PrincipalModule } from './principal/principal.module';
import { DialogService } from './shared/services/dialog.service';


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
    DialogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
