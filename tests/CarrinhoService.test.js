import prisma from '../src/lib/prisma.js';
import CarrinhoService from '../src/services/CarrinhoService.js';
import { beforeEach, describe, test, expect } from '@jest/globals';

describe('CarrinhoService', () => {
  let carrinho;

  beforeEach(() => {
    carrinho = new CarrinhoService();
  });

  test('deve adicionar produtos ao carrinho', async () => {
    const produto = { nome: 'Notebook', preco: 2000, quantidade: 2 };
    await carrinho.adicionarProduto(produto);

    const produtos = await prisma.produto.findUnique({
      where: {
        nome: 'Notebook',
      },
    });

    expect(produtos).toHaveProperty('nome', 'Notebook');
  });

  test('deve acumular quantidade quando adicionar o mesmo produto', async () => {
    carrinho.adicionarProduto({ nome: 'Mouse', preco: 50, quantidade: 1 });
    carrinho.adicionarProduto({ nome: 'Mouse', preco: 50, quantidade: 2 });

    const produtos = await prisma.produto.findMany({
      where: {
        nome: 'Mouse',
      },
    });

    expect(produtos[0].quantidade).toBeGreaterThan(3);
  });

  test('deve atualizar o preco se o mesmo produto for adicionado com preco diferente', async () => {
    await carrinho.adicionarProduto({
      nome: 'teclado',
      preco: 100,
      quantidade: 1,
    });
    await carrinho.adicionarProduto({
      nome: 'Teclado',
      preco: 150,
      quantidade: 2,
    });

    const produto = await prisma.produto.findMany({
      where: {
        nome: 'Teclado',
      },
    });

    expect(produto[0].preco).toBeGreaterThan(149);
  });

  test('deve remover produto', async () => {
    await carrinho.adicionarProduto({
      nome: 'Monitor',
      preco: 800,
      quantidade: 1,
    });

    const produto = await prisma.produto.findMany({
      where: {
        nome: 'Monitor',
      },
    });

    await prisma.produto.delete({
      where: {
        id: produto[0].id,
      },
    });

    const buscado = await prisma.produto.findMany({
      where: {
        nome: 'Monitor',
      },
    });

    expect(buscado.length).toEqual(0);
  });

  test('deve alterar a quantidade do produto', async () => {
    await carrinho.adicionarProduto({
      nome: 'Cadeira',
      preco: 300,
      quantidade: 1,
    });
    await carrinho.alterarQuantidade('Cadeira', 3);

    const produto = await prisma.produto.findMany({
      where: {
        nome: 'Cadeira',
      },
    });

    expect(produto[0].quantidade).toBeGreaterThan(2);
  });

  test('deve calcular total corretamente', async () => {
    await carrinho.adicionarProduto({
      nome: 'Mesa',
      preco: 400,
      quantidade: 2,
    });
    await carrinho.adicionarProduto({
      nome: 'Luminaria',
      preco: 150,
      quantidade: 1,
    });

    const total = await carrinho.calcularTotal();

    expect(total).toBeGreaterThan(500);
  });

  describe('Descontos e frete', () => {
    test('deve aplicar cupom percentual corretamente', async () => {
      await carrinho.adicionarProduto({
        nome: 'Notebook',
        preco: 2000,
        quantidade: 1,
      });
      await carrinho.aplicarCupom('Desconto10');

      const calcularTotalComDesconto =
        await carrinho.calcularTotalComDesconto();
      expect(calcularTotalComDesconto).toBeGreaterThan(1800);
    });

    test('deve aplicar cupom de valor fixo corretamente', async () => {
      await carrinho.adicionarProduto({
        nome: 'Teclado',
        preco: 600,
        quantidade: 1,
      });
      await carrinho.aplicarCupom('OFF50');

      const totalComDesconto = await carrinho.calcularTotalComDesconto();
      expect(totalComDesconto).toBeGreaterThan(549);
    });

    test('deve não aplicar desconto para cupom inválido', async () => {
      await carrinho.adicionarProduto({
        nome: 'Mouse',
        preco: 100,
        quantidade: 1,
      });
      await carrinho.aplicarCupom('CUPOMINVALIDO');

      const totalComDesconto = await carrinho.calcularTotalComDesconto();
      expect(totalComDesconto).toBeGreaterThan(99);
    });

    test('deve calcular frete gratis para compras acima de 500', async () => {
      carrinho.adicionarProduto({ nome: 'Monitor', preco: 600, quantidade: 1 });

      const frete = await carrinho.calcularFrete();
      expect(frete).toBe(0);
    });

    test('deve cobrar frete se total < 500', async () => {
      await carrinho.adicionarProduto({
        nome: 'Mouse',
        preco: 150,
        quantidade: 2,
      });

      const frete = await carrinho.calcularFrete();
      expect(frete).toBe(0);
    });
  });
});
