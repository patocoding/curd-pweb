import { Component } from '@angular/core';
import { Produto } from './models/produto';
import { ProdutoService } from './services/produto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  novoProduto: Produto = new Produto(0, '', 0);
  produtoParaEditar: Produto | null = null;
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {
    this.produtos = this.produtoService.getProdutos();
  }

  addProduto(): void {
    const newId = this.produtos.length > 0 ? Math.max(...this.produtos.map(p => p.id)) + 1 : 1;
    const produto = new Produto(newId, this.novoProduto.nome, this.novoProduto.preco);
    this.produtoService.addProduto(produto);
    this.novoProduto = new Produto(0, '', 0);
    this.produtos = this.produtoService.getProdutos();
  }

  editProduto(produto: Produto): void {
    this.produtoParaEditar = { ...produto };
  }

  updateProduto(): void {
    if (this.produtoParaEditar) {
      this.produtoService.updateProduto(this.produtoParaEditar);
      this.produtoParaEditar = null;
      this.produtos = this.produtoService.getProdutos();
    }
  }

  deleteProduto(id: number): void {
    this.produtoService.deleteProduto(id);
    this.produtos = this.produtoService.getProdutos();
  }
}