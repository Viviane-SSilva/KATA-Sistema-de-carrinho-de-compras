import CarrinhoService from '../services/CarrinhoService.js';

async function RemoverProdutoController(request, response) {
  const service = new CarrinhoService();

  try {
    const { nome } = request.query;
    const sucesso = await service.removerProduto(nome);
    if (sucesso) {
      response.status(200).json({ mensagem: 'Produto removido com sucesso' });
    } else {
      response.status(404).json({ erro: 'Produto não encontrado' });
    }
  } catch (error) {
    response.status(400).json({ erro: error.message });
  }
}

export { RemoverProdutoController };
