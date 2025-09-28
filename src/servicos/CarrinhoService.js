import ProdutoValidator from '../validacao/ProdutoValidator.js';
import CarrinhoRepo from '../repositorios/CarrinhoRepo.js';
import DescontoService from './DescontoService.js';

class CarrinhoService {
  constructor() {
    this.repositorio = new CarrinhoRepo();
  }

  adicionarProduto(produto) {
    const validado = ProdutoValidator.validar(produto);
    this.repositorio.adicionarProduto(validado.nome, {
      preco: validado.preco,
      quantidade: validado.quantidade,
    });
    return this.repositorio.listar().find((p) => p.nome === validado.nome);
  }

  removerProduto(nome) {
    return this.repositorio.remover(nome);
  }

  alterarQuantidade(nome, quantidade) {
    return (this, this.repositorio.alterarQuantidade(nome, quantidade));
  }

  listarProdutos() {
    return this.repositorio.listar();
  }

  calcularTotal() {
    return this.repositorio.calcularTotal();
  }

  aplicarCupom(cupom) {
    this.cupom = cupom;
  }

  calcularTotalComDesconto() {
    const total = this.calcularTotal();

    if (!this.cupom) return total;

    const cupons = {
      Desconto10: () => DescontoService.descontoPercentual(total, 10),
      OFF50: () => DescontoService.descontoValorFixo(total, 50),
    };

    const desconto = cupons[this.cupom] ? cupons[this.cupom]() : 0;

    return total - desconto;
  }

  calcularFrete() {
    const total = this.calcularTotal();
    return total > 500 ? 0 : 50;
  }
}

export default CarrinhoService;
