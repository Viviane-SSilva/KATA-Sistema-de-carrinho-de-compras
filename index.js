import CarrinhoService from './src/servicos/CarrinhoService.js';

const carrinho = new CarrinhoService();

carrinho.adicionarProduto({ nome: 'Notebook', preco: 2000 }, 2);
carrinho.adicionarProduto({ nome: 'Mouse', preco: 50 }, 1);

console.log('Total:', carrinho.calcularTotal());

carrinho.aplicarCupom('Desconto10');

//carrinho.removerProduto('Mouse');

console.log('Total com desconto:', carrinho.calcularTotalComDesconto());
console.log('Frete:', carrinho.calcularFrete());
