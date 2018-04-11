import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Http, RequestOptions } from '@angular/http';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AuthGuard } from './auth.guard';
import { MoneyHttp } from './money-http';
import { AuthService } from './auth.service';
import { LogoutService } from './logout.service';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';

export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [ { 'Content-Type': 'application/json' } ]
  });

  return new MoneyHttp(auth, config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  declarations: [ LoginFormComponent ],
  providers: [
    AuthGuard,
    LogoutService,
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [AuthService, Http, RequestOptions] }
  ],
  exports: []
})
export class SegurancaModule { }
