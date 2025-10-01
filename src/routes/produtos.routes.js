import { Router } from 'express';
import { AdicionarProdutoController } from '../controllers/AdicionarProduto.controller';
import { AlterarQuantidadeController } from '../controllers/AlterarQuantidadeProd.controller';
import { ListarProdutoController } from '../controllers/ListarProduto.controller';
import { RemoverProdutoController } from '../controllers/RemoverProduto.controller';

const routes = Router();

routes.post('/criar-produto', AdicionarProdutoController);
routes.post('/alterar-quantidade-produto', AlterarQuantidadeController);
routes.get('/listar-produtos', ListarProdutoController);
routes.delete('/remover-produto-nome', RemoverProdutoController);

export { routes };
