import CarrinhoRepoPrisma from '../repositorios/CarrinhoRepo.prisma.js';
import DescontoService from './DescontoService.js';
import ProdutoValidator from '../validacao/ProdutoValidator.js';

class CarrinhoService {
  constructor() {
    this.repositorio = new CarrinhoRepoPrisma();
    this.cupom = null;
  }

  async adicionarProduto(produto) {
    const validado = ProdutoValidator.validar(produto);

    return this.repositorio.adicionarProduto(validado.nome, {
      preco: validado.preco,
      quantidade: validado.quantidade,
    });
  }

  async removerProduto(nome) {
    return this.repositorio.remover(nome);
  }

  async alterarQuantidade(nome, quantidade) {
    return this.repositorio.alterarQuantidade(nome, quantidade);
  }

  async listarProdutos() {
    return this.repositorio.listar();
  }

  async calcularTotal() {
    return await this.repositorio.calcularTotal();
  }

  aplicarCupom(cupom) {
    this.cupom = cupom;
  }

  async calcularTotalComDesconto() {
    const total = await this.calcularTotal();

    if (!this.cupom) return total;

    const cupons = {
      Desconto10: () => DescontoService.descontoPercentual(total, 10),
      OFF50: () => DescontoService.descontoValorFixo(total, 50),
    };

    const desconto = cupons[this.cupom] ? cupons[this.cupom]() : 0;

    return total - desconto;
  }

  async calcularFrete() {
    const total = await this.calcularTotal();
    return total > 500 ? 0 : 50;
  }
}

export default CarrinhoService;
