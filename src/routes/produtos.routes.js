import { Router } from 'express';
import { AdicionarProdutoController } from '../controllers/AdicionarProduto.controller.js';
import { AlterarQuantidadeController } from '../controllers/AlterarQuantidadeProd.controller.js';
import { ListarProdutoController } from '../controllers/ListarProduto.controller.js';
import { RemoverProdutoController } from '../controllers/RemoverProduto.controller.js';

const routes = Router();

routes.post('/criar-produto', AdicionarProdutoController);
routes.post('/alterar-quantidade-produto', AlterarQuantidadeController);
routes.get('/listar-produtos', ListarProdutoController);
routes.delete('/remover-produto-nome', RemoverProdutoController);

export { routes };
