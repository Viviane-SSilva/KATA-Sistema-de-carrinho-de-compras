**Sistema de Carrinho de Compras
API RESTful para gerenciamento de carrinho de compras com funcionalidades de adicionar, remover, listar e alterar quantidade de produtos.**

🚀 Tecnologias
Node.js
Express
Prisma (ORM)
PostgreSQL
Docker
Jest (para testes)
📋 Pré-requisitos
Docker e Docker Compose instalados
Node.js (versão 16 ou superior)
npm ou yarn
🛠️ Configuração do Ambiente
Clone o repositório

git clone [seu-repositorio].git
cd KATA-Sistema-de-carrinho-de-compras
Instale as dependências

npm install
# ou
yarn install
Configure as variáveis de ambiente Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

DATABASE_URL="postgresql://admin:admin123@localhost:5432/carrinho_db?schema=public"
PORT=3000
Inicie o banco de dados com Docker

docker-compose up -d
Execute as migrações do Prisma

npx prisma migrate dev
Inicie o servidor

npm start
# ou
yarn start
O servidor estará disponível em http://localhost:3000

📚 Endpoints da API

<ins>1. Adicionar Produto</ins>
POST /criar-produto

**Exemplo de requisição:

{
  "nome": "Notebook",
  "preco": 3500.00,
  "quantidade": 2
}
Resposta de sucesso (201):

{
  "id": 1,
  "nome": "Notebook",
  "preco": 3500.00,
  "quantidade": 2,
}

<ins>2. Listar Produtos</ins>
GET /listar-produtos

Resposta de sucesso (200):

[
  {
    "id": 1,
    "nome": "Notebook",
    "preco": 3500.00,
    "quantidade": 2,
  },
  {
    "id": 2,
    "nome": "Mouse",
    "preco": 150.50,
    "quantidade": 5,
  }
]

<ins>3. Alterar Quantidade de um Produto</ins>
POST /alterar-quantidade-produto

Exemplo de requisição:

{
  "nome": "Notebook",
  "quantidade": 3
}
Resposta de sucesso (200):

{
  "id": 1,
  "nome": "Notebook",
  "preco": 3500.00,
  "quantidade": 3,
}

<ins>4. Remover Produto </ins>
DELETE /remover-produto-nome

Exemplo de requisição:

/remover-produto-nome?nome=nome
Resposta de sucesso (200):

{
  "mensagem": "Produto removido com sucesso"
}

🧪 Executando os Testes
# Executar todos os testes
npm test
🐳 Docker
Iniciar os containers
docker-compose up -d
Parar os containers
docker-compose down
Visualizar logs do container
docker logs -f postgres_carrinho
📝 Notas Adicionais
A API segue os princípios RESTful
Todas as respostas são em formato JSON
Os preços são sempre em formato decimal com duas casas decimais
As datas seguem o formato ISO 8601
