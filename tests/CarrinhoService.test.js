import CarrinhoService from '../src/servicos/CarrinhoService.js';
import { beforeEach, describe, test, expect } from '@jest/globals';

describe('CarrinhoService', () => {
  let carrinho;

  beforeEach(() => {
    carrinho = new CarrinhoService();
  });

  test('deve adicionar produtos ao carrinho', () => {
    const produto = { nome: 'Notebbok', preco: 2000, quantidade: 2 };
    carrinho.adicionarProduto(produto);

    const produtos = carrinho.listarProdutos();
    expect(produtos).toHaveLength(1);
    expect(produtos[0]).toEqual(expect.objectContaining(produto));
  });

  test('deve acumular quantidade quando adicionar o mesmo produto', () => {
    carrinho.adicionarProduto({ nome: 'Mouse', preco: 50, quantidade: 1 });
    carrinho.adicionarProduto({ nome: 'Mouse', preco: 50, quantidade: 2 });

    const produtos = carrinho.listarProdutos();
    expect(produtos[0].quantidade).toBe(3);
  });
});
