import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ErrorsModule } from './errors/errors.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing.module';
import { PrincipalModule } from './principal/principal.module';


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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
