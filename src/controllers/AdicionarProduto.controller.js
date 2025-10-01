import CarrinhoService from '../services/CarrinhoService.js';

async function AdicionarProdutoController(request, response) {
  const service = new CarrinhoService();

  try {
    const produto = request.body;
    const produtoAdicionado = await service.adicionarProduto(produto);
    response.status(201).json(produtoAdicionado);
  } catch (error) {
    response.status(400).json({ erro: error.message });
  }
}

export { AdicionarProdutoController };
