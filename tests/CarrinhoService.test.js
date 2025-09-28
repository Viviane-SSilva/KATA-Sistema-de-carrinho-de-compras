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

  test('deve atualizar o preco se o mesmo produto for adicionado com preco diferente', () => {
    carrinho.adicionarProduto({ nome: 'teclado', preco: 100, quantidade: 1 });
    carrinho.adicionarProduto({ nome: 'Teclado', preco: 150, quantidade: 2 });

    const produto = carrinho.listarProdutos().find((p) => p.nome === 'Teclado');
    expect(produto.preco).toBe(150);
  });

  test('deve remover produto', () => {
    carrinho.adicionarProduto({ nome: 'Monitor', preco: 800, quantidade: 1 });
    carrinho.removerProduto('Monitor');

    expect(carrinho.listarProdutos()).toHaveLength(0);
  });

  test('deve alterar a quantidade do produto', () => {
    carrinho.adicionarProduto({ nome: 'Cadeira', preco: 300, quantidade: 1 });
    carrinho.alterarQuantidade('Cadeira', 3);

    const produto = carrinho.listarProdutos().find((p) => p.nome === 'Cadeira');
    expect(produto.quantidade).toBe(3);
  });

  test('deve calcular total corretamente', () => {
    carrinho.adicionarProduto({ nome: 'Mesa', preco: 400, quantidade: 2 });
    carrinho.adicionarProduto({ nome: 'Luminaria', preco: 150, quantidade: 1 });

    const total = carrinho.calcularTotal();
    expect(total).toBe(950);
  });

  describe('Descontos e frete', () => {
    test('deve aplicar cupom percentual corretamente', () => {
      carrinho.adicionarProduto({
        nome: 'Notebook',
        preco: 2000,
        quantidade: 1,
      });
      carrinho.aplicarCupom('Desconto10');

      const calcularTotalComDesconto = carrinho.calcularTotalComDesconto();
      expect(calcularTotalComDesconto).toBe(1800);
    });

    test('deve aplicar cupom de valor fixo corretamente', () => {
      carrinho.adicionarProduto({ nome: 'Teclado', preco: 600, quantidade: 1 });
      carrinho.aplicarCupom('OFF50');

      const totalComDesconto = carrinho.calcularTotalComDesconto();
      expect(totalComDesconto).toBe(550);
    });

    test('deve não aplicar desconto para cupom inválido', () => {
      carrinho.adicionarProduto({ nome: 'Mouse', preco: 100, quantidade: 1 });
      carrinho.aplicarCupom('CUPOMINVALIDO');

      const totalComDesconto = carrinho.calcularTotalComDesconto();
      expect(totalComDesconto).toBe(100);
    });
  });
});
