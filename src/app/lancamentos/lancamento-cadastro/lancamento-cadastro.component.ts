import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { Lancamento } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { LancamentoService } from './../../lancamentos/lancamento.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();
  pt_BR: any;

  constructor(
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo lançamento');
    const codigoLancamento = this.route.snapshot.params['codigo'];
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
    this.pt_BR = {
      firstDayOfWeek: 0,
      dayNames: [ "Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado" ],
      dayNamesShort: [ "dom","seg","ter","qua","qui","sex","sáb" ],
      dayNamesMin: [ "D","S","T","Q","Q","S","S" ],
      monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
      monthNamesShort: [ "Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez" ]
    };
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
                          .then(lancamentoAdicionado => {
                            this.toasty.success('Lançamento adicinado com sucesso!');
                            // form.reset();
                            // this.lancamento = new Lancamento();
                            this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
                          })
                          .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
                          .then(lancamento => {
                            this.lancamento = lancamento;
                            this.toasty.success('Lançamento atualizado com sucesso!');
                            this.atualizarTituloEdicao();
                          })
                          .catch(erro => this.errorHandler.handle(erro));
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscaPorCodigo(codigo)
                          .then(lancamento => {
                            this.lancamento = lancamento;
                            this.atualizarTituloEdicao();
                          })
                          .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
                                .then(categorias => {
                                  this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }) );
                                })
                                .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
                                .then(pessoas => {
                                  this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo }) );
                                })
                                .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }
  
}
