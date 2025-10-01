import { Router } from 'express';
import { AdicionarProdutoController } from '../controllers/AdicionarProduto.controller';
import { AlterarQuantidadeController } from '../controllers/AlterarQuantidadeProd.controller';
import { ListarProdutoController } from '../controllers/ListarProduto.controller';

const routes = Router();

routes.post('/criar-produto', AdicionarProdutoController);
routes.post('/alterar-quantidade-produto', AlterarQuantidadeController);
routes.get('/listar-produtos', ListarProdutoController);

export { routes };
