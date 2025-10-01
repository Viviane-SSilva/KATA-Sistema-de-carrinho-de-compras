import { Router } from 'express';
import { AdicionarProdutoController } from '../controllers/AdicionarProduto.controller';
import { AlterarQuantidadeController } from '../controllers/AlterarQuantidadeProd.controller';

const routes = Router();

routes.post('/criar-produto', AdicionarProdutoController);
routes.post('/alterar-quantidade-produto', AlterarQuantidadeController);

export { routes };
