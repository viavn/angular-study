import { Injectable } from "@angular/core";
import { Produto } from "../models/produto";

@Injectable()
export class ProdutoService {

    produtos: Produto[];

    constructor() {
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

    obterTodos(): Produto[] {
        return this.produtos;
    }

    obterPorId(id: number): Produto {
        return this.produtos.find(p => p.id === id);
    }
}