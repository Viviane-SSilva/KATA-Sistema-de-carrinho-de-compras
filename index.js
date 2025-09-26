
const CarrinhoCompras = require('./src/repo.product');

const carrinho = new CarrinhoCompras();


carrinho.adicionarProduto({ nome: 'Notebook', preco: 2000 });
carrinho.adicionarProduto({ nome: 'Mouse', preco: 50 });

console.log(carrinho.listarProdutos());
console.log('Total do carrinho:', carrinho.calcularTotal());