import DescontoService from '../src/services/DescontoService.js';
import { describe, test, expect } from '@jest/globals';

describe('DescontoService', () => {
  describe('descontoPercentual', () => {
    test('Deve calcular desconto percentual válido', async () => {
      const desconto = DescontoService.descontoPercentual(1000, 10);
      expect(desconto).toBe(100);
    });

    test('deve retornar 0 para percentual inválido (0 ou menor)', async () => {
      expect(DescontoService.descontoPercentual(1000, 0)).toBe(0);
      expect(DescontoService.descontoPercentual(1000, -5)).toBe(0);
    });

    test('Deve retornar 0 para percentual acima de 1000', async () => {
      expect(DescontoService.descontoPercentual(1000, 1500)).toBe(0);
    });
  });

  describe('descontoValorFixo', () => {
    test('deve aplicar o desconto fixo válido', async () => {
      const desconto = DescontoService.descontoValorFixo(600, 100);
      expect(desconto).toBe(100);
    });

    test('deve limitar desconto fixo ao valor total', async () => {
      const desconto = DescontoService.descontoValorFixo(80, 200);
      expect(desconto).toBe(80);
    });

    test('deve retornar 0 para valor inválido (0 ou menor)', async () => {
      expect(DescontoService.descontoValorFixo(500, 0)).toBe(0);
      expect(DescontoService.descontoValorFixo(500, -20)).toBe(0);
    });
  });

  describe('calcularFrete', () => {
    test('deve retornar 0 se total >= minimoFreteGratis', async () => {
      const frete = DescontoService.calcularFrete(600);
      expect(frete).toBe(0);
    });

    test('Deve retornar valor do frete se total < minimoFreteGratis', async () => {
      const frete = DescontoService.calcularFrete(400);
      expect(frete).toBe(50);
    });

    test('deve permitir alterar valor do frete e minimo para gratis', async () => {
      const frete = DescontoService.calcularFrete(200, 30, 300);
      expect(frete).toBe(30);
    });
  });
});
