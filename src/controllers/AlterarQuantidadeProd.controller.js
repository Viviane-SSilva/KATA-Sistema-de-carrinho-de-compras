import CarrinhoService from '../services/CarrinhoService.js';

async function AlterarQuantidadeController(request, response) {
  const service = new CarrinhoService();

  try {
    const { nome, quantidade } = request.body;
    const sucesso = await service.alterarQuantidade(nome, quantidade);
    if (sucesso) {
      response.status(200).json({ mensagem: 'Produto alterado com sucesso' });
    } else {
      response.status(404).json({ erro: 'Produto não encontrado' });
    }
  } catch (error) {
    response.status(400).json({ erro: error.message });
  }
}

export { AlterarQuantidadeController };
