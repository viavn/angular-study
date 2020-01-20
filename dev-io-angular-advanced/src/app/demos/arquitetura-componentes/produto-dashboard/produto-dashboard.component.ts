import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Produto } from '../models/produto';
import { Observable, fromEvent } from 'rxjs';
import { ProdutoCountComponent } from '../components/produto-count.component';
import { ProdutoDetalheComponent } from '../components/produto-card-detalhe.component';

@Component({
  selector: 'app-produto-dashboard',
  templateUrl: './produto-dashboard.component.html',
  styles: []
})
export class ProdutoDashboardComponent implements OnInit, AfterViewInit {

  produtos: Produto[];

  @ViewChild(ProdutoCountComponent, { static: false }) contador: ProdutoCountComponent;
  @ViewChild('teste', { static: false }) mensagemTela: ElementRef;

  @ViewChildren(ProdutoDetalheComponent) botoes: QueryList<ProdutoDetalheComponent>;

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

  ngAfterViewInit(): void {
    const clickTexto: Observable<any> = fromEvent(this.mensagemTela.nativeElement, 'click');
    clickTexto.subscribe(() => {
      alert('clicou no texto!');
      return;
    });
  }

  mudarStatus(event: Produto) {
    event.ativo = !event.ativo;
  }

}
