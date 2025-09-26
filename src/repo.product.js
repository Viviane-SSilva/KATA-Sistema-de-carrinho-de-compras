class  CarrinhoCompras {
    constructor() {
        this.produtos = [];
    }

    adicionarProduto(produto) {
        return this.produtos.push(produto);
    }

    listarProdutos() {
        return this.produtos;
    }

    calcularTotal() {
        return this.produtos.reduce((total, produto) => total + produto.preco, 0);
    }

}



module.exports = CarrinhoCompras;