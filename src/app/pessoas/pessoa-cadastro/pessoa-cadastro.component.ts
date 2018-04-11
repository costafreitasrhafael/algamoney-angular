import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { Pessoa } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova pessoa');
    const codigoPessoa = this.route.snapshot.params['codigo'];
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  nova(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);
    this.router.navigate(['/pessoas/nova']);
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
                      .then(pessoaAdicionada => {
                        this.toasty.success('Pessoa adicionado com sucesso!');
                        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
                      })
                      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
                      .then(pessoa => {
                        this.pessoa = pessoa;
                        this.toasty.success('Pessoa alterada com sucesso!');
                        this.atualizarTituloEdicao();
                      })
                      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscaPorCodigo(codigo)
                          .then(pessoa => {
                            this.pessoa = pessoa;
                            this.atualizarTituloEdicao();
                          })
                          .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição da pessoa: ${this.pessoa.nome}`);
  }

}
