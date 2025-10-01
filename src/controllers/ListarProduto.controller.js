import CarrinhoService from '../services/CarrinhoService.js';

async function ListarProdutoController(request, response) {
  const service = new CarrinhoService();

  try {
    const produtos = await service.listarProdutos();
    response.status(200).json(produtos);
  } catch (error) {
    response.status(500).json({ erro: error.message });
  }
}

export { ListarProdutoController };
