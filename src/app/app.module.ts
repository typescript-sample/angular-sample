import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpRequest } from './shared/HttpRequest';
import { MainComponent } from './shared/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './shared/AuthenticationService';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {ModalModule} from 'ngx-bootstrap/modal';
import { AuthorizationService } from './shared/AuthorizationService';
import { CoreModule } from '@/core/core.module';

  
@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    CoreModule
  ],
  providers: [
    HttpRequest,
    AuthenticationService,
    CookieService,
    AuthorizationService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
