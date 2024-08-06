import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos: Produto[] = [];

  constructor() { }

  getProdutos(): Produto[] {
    return this.produtos;
  }

  addProduto(produto: Produto): void {
    this.produtos.push(produto);
  }

  updateProduto(produto: Produto): void {
    const index = this.produtos.findIndex(p => p.id === produto.id);
    if (index !== -1) {
      this.produtos[index] = produto;
    }
  }

  deleteProduto(id: number): void {
    this.produtos = this.produtos.filter(p => p.id !== id);
  }
}