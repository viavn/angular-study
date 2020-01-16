import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';

import { Usuario } from './models/usuario';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { CustomValidators } from 'ng2-validation';
import { ValidationMessages, GenericValidator, DisplayMessage } from './generic-form-validation';
import { Observable, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  cadastroForm: FormGroup;
  usuario: Usuario;
  formResult: string = '';
  MASKS = utilsBr.MASKS;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder) {
    this.validationMessages = {
      nome: {
        required: 'O nome é obrigatório',
        minlength: 'O nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O nome precisa ter no máximo 150 caracteres'
      },
      cpf: {
        required: 'O CPF é obrigatório',
        cpf: 'CPF em formato inválido'
      },
      email: {
        required: 'O e-mail é obrigatório',
        email: 'E-mail inválido'
      },
      senha: {
        required: 'Informa uma senha',
        rangeLength: 'A senha deve possuir entre 6 a 15 caracteres'
      },
      senhaConfirmacao: {
        required: 'Informa a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 a 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    let senha = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([6, 15])
    ]);

    let senhaConfirmacao = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
      CustomValidators.equalTo(senha)
    ]);

    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.email]],
      senha: senha,
      senhaConfirmacao: senhaConfirmacao
    });
  }

  ngAfterViewInit(): void {
    // Coleção de Observables que irá ser disparada para cada elemento do formulário
    // através evento 'blur'
    let cotrolBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...cotrolBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });
  }

  adicionarUsuario() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      this.formResult = JSON.stringify(this.usuario);
    }
  }
}
