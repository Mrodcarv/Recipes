import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { HeaderComponent }  from './header/header.component';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent
    ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),  
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
