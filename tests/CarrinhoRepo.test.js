import CarrinhoRepo from '../src/repositorios/CarrinhoRepo.js';
import { beforeEach, expect, describe, test } from '@jest/globals';

describe('CarrinhoRepo', () => {
  let repo;

  beforeEach(() => {
    repo = new CarrinhoRepo();
  });

  test('deve adicionar produto ao carrinho', () => {
    repo.adicionarProduto('Notebook', { preco: 3000, quantidade: 1 });
    const produtos = repo.listar();

    expect(produtos).toHaveLength(1);
    expect(produtos[0]).toEqual({
      nome: 'Notebook',
      preco: 3000,
      quantidade: 1,
    });
  });

  test(' deve acumular quantidade se o mesmo produto for adicionado', () => {
    repo.adicionarProduto('Mouse', { preco: 100, quantidade: 1 });
    repo.adicionarProduto('Mouse', { preco: 100, quantidade: 2 });

    const produtos = repo.listar();
    expect(produtos).toHaveLength(1);
    expect(produtos[0].quantidade).toBe(3);
  });

  test('deve atualizar o preco se o mesmo produto for adicionado com preco diferente', () => {
    repo.adicionarProduto('Teclado', { preco: 50, quantidade: 1 });
    repo.adicionarProduto('Teclado', { preco: 120, quantidade: 2 });

    const produtos = repo.listar();
    expect(produtos).toHaveLength(1);
    expect(produtos[0].preco).toBe(120);
    expect(produtos[0].quantidade).toBe(3);
  });

  test('deve remover produto do carrinho', () => {
    repo.adicionarProduto('Monitor', { preco: 800, quantidade: 1 });
    repo.remover('Monitor');

    const produtos = repo.listar();
    expect(produtos).toHaveLength(0);
  });

  test('deve alterar a quantidade do produto', () => {
    repo.adicionarProduto('Cadeira', { preco: 300, quantidade: 1 });
    repo.alterarQuantidade('Cadeira', 4);

    const produtos = repo.listar().find((p) => p.nome === 'Cadeira');
    expect(produtos.quantidade).toBe(4);
  });

  test('deve calcular o total do carrinho', () => {
    repo.adicionarProduto('Mesa', { preco: 400, quantidade: 2 });
    repo.adicionarProduto('Luminaria', { preco: 150, quantidade: 1 });

    const total = repo.calcularTotal();
    expect(total).toBe(950);
  });
});
