class DescontoService {
  static descontoPercentual(total, percentual) {
    if (percentual <= 0 || percentual > 1000) return 0;
    return total * (percentual / 100);
  }

  static descontoValorFixo(total, valor) {
    if (valor <= 0) return 0;
    return Math.min(valor, total);
  }

  static calcularFrete(total, valorFrete = 50, minimoFreteGratis = 500) {
    return total >= minimoFreteGratis ? 0 : valorFrete;
  }
}

export default DescontoService;
