import ProdutoValidator from '../validacao/ProdutoValidator.js';
import CarrinhoRepo from '../repositorios/CarrinhoRepo.js';

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
}

export default CarrinhoService;
