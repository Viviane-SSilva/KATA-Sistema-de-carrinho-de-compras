import DescontoService from '../src/servicos/DescontoService.js';
import { describe, test, expect } from '@jest/globals';

describe('DescontoService', () => {
  describe('descontoPercentual', () => {
    test('Deve calcular desconto percentual válido', () => {
      const desconto = DescontoService.descontoPercentual(1000, 10);
      expect(desconto).toBe(100);
    });

    test('deve retornar 0 para percentual inválido (0 ou menor)', () => {
      expect(DescontoService.descontoPercentual(1000, 0)).toBe(0);
      expect(DescontoService.descontoPercentual(1000, -5)).toBe(0);
    });

    test('Deve retornar 0 para percentual acima de 1000', () => {
      expect(DescontoService.descontoPercentual(1000, 1500)).toBe(0);
    });
  });
});
