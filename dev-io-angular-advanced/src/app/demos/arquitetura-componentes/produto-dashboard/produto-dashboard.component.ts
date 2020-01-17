import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-produto-dashboard',
  templateUrl: './produto-dashboard.component.html',
  styles: []
})
export class ProdutoDashboardComponent implements OnInit {
  produtos: Produto[];

  constructor() { }

  ngOnInit() {
    this.produtos = [
      {
        id: 1,
        nome: 'Teste',
        ativo: true,
        valor: 100,
        imagem: 'celular.jpg'
      },
      {
        id: 2,
        nome: 'GoPro',
        ativo: true,
        valor: 850,
        imagem: 'gopro.jpg'
      },
      {

        id: 3,
        nome: 'Headset',
        ativo: true,
        valor: 259.99,
        imagem: 'headset.jpg'
      },
      {
        id: 4,
        nome: 'Mouse',
        ativo: false,
        valor: 159.99,
        imagem: 'mouse.jpg'
      }
    ];
  }

  mudarStatus(event: Produto) {
    event.ativo = !event.ativo;
  }

}
