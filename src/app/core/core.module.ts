import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Adicione o registerLocaleData e o localePt
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
// E por fim, registre o localePt como 'pt-BR'
registerLocaleData(localePt, 'pt-BR');

import { JwtHelper } from 'angular2-jwt';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AuthService } from './../seguranca/auth.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { CategoriaService } from './../categorias/categoria.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ConfirmDialogModule,
    ToastyModule.forRoot(),
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    ErrorHandlerService,
    AuthService,

    ConfirmationService,
    JwtHelper,
    Title,

    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
