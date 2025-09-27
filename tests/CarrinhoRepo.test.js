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
});
