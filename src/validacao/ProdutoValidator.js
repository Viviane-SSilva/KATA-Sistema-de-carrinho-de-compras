class ProdutoValidator {
  static validar(produto) {
    if (!produto || typeof produto != 'object') {
      throw new TypeError('Produto inválido');
    }

    if (!produto.nome || typeof produto.nome !== 'string') {
      throw new TypeError('Nome do produto inválido');
    }

    if (
      typeof produto.preco !== 'number' ||
      Number.isNaN(produto.preco) ||
      produto.preco < 0
    ) {
      throw new TypeError('Preço do produto inválido');
    }

    if (produto.quantidade === undefined || produto.quantidade === null) {
      produto.quantidade = 1;
    }

    return produto;
  }
}

export default ProdutoValidator;
