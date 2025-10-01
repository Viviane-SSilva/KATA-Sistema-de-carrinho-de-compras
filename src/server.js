import express from 'express';
import { routes } from './routes/produtos.routes.js';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log('Servidor rodando na http://localhost:3000 .');
});
