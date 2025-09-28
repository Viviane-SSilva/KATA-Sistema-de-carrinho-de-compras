import ProdutoValidator from '../src/validacao/ProdutoValidator.js';
import { describe, test, expect } from '@jest/globals';

describe('ProdutoValidator', () => {
  test('deve validar um produto válido', () => {
    const produto = {
      nome: 'Notebook',
      preco: 2500,
      quantidade: 5,
    };
    const validado = ProdutoValidator.validar(produto);
    expect(validado.nome).toBe('Notebook');
    expect(validado.preco).toBe(2500);
    expect(validado.quantidade).toBe(5);
  });

  test('deve definir quantidade como 1 se não fornecido', () => {
    const produto = {
      nome: 'Mouse',
      preco: 150,
    };
    const validado = ProdutoValidator.validar(produto);

    expect(validado.quantidade).toBe(1);
    expect(validado.nome).toBe('Mouse');
    expect(validado.preco).toBe(150);
  });
});
