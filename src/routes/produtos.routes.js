import { Router } from 'express';
import { AdicionarProdutoController } from '../controllers/AdicionarProduto.controller';

const routes = Router();

routes.post('/criar-produto', AdicionarProdutoController);

export { routes };
