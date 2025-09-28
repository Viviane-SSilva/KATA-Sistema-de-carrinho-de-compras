import CarrinhoService from './src/servicos/CarrinhoService.js';

const carrinho = new CarrinhoService();

carrinho.adicionarProduto({ nome: 'Notebook', preco: 2000 }, 2);
carrinho.adicionarProduto({ nome: 'Mouse', preco: 50 }, 1);

carrinho.removerProduto('Mouse');

carrinho.alterarQuantidade('Notebook', 1);

console.log(carrinho.listarProdutos());

console.log('Total:', carrinho.calcularTotal());
