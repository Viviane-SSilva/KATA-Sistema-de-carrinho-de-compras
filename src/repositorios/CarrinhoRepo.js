class CarrinhoRepo {
  constructor() {
    this.produtos = new Map();
  }

  adicionarProduto(nome, produtoInfo) {
    if (this.produtos.has(nome)) {
      const existente = this.produtos.get(nome);
      existente.quantidade += produtoInfo.quantidade;
      existente.preco = produtoInfo.preco;
      this.produtos.set(nome, existente);
    } else {
      this.produtos.set(nome, { ...produtoInfo });
    }
  }

  remover(nome) {
    return this.produtos.delete(nome);
  }

  alterarQuantidade(nome, quantidade) {
    if (!this.produtos.has(nome)) return false;

    if (quantidade <= 0) {
      this.produtos.delete(nome);
    } else {
      const produto = this.produtos.get(nome);
      produto.quantidade = quantidade;
      this.produtos.set(nome, produto);
    }
    return true;
  }

  listar() {
    return Array.from(this.produtos.entries()).map(([nome, produtoInfo]) => ({
      nome,
      preco: produtoInfo.preco,
      quantidade: produtoInfo.quantidade,
    }));
  }

  calcularTotal() {
    let total = 0;
    for (const { preco, quantidade } of this.produtos.values()) {
      total += preco * quantidade;
    }
    return total;
  }
}

export default CarrinhoRepo;
