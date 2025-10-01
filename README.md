# Sistema de Carrinho de Compras

API RESTful para gerenciamento de carrinho de compras com funcionalidades de adicionar, remover, listar e alterar quantidade de produtos.

## 🚀 Tecnologias

- Node.js
- Express
- Prisma (ORM)
- PostgreSQL
- Docker
- Jest (para testes)

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- Node.js (versão 16 ou superior)
- npm ou yarn

## 🛠️ Configuração do Ambiente

1. **Clone o repositório**
   ```bash
   git clone [seu-repositorio].git
   cd KATA-Sistema-de-carrinho-de-compras
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   DATABASE_URL="postgresql://admin:admin123@localhost:5432/carrinho_db?schema=public"
   PORT=3000
   ```

4. **Inicie o banco de dados com Docker**
   ```bash
   docker-compose up -d
   ```

5. **Execute as migrações do Prisma**
   ```bash
   npx prisma migrate dev
   ```

6. **Inicie o servidor**
   ```bash
   npm start
   # ou
   yarn start
   ```

   O servidor estará disponível em `http://localhost:3000`

## 📚 Endpoints da API

### 1. Adicionar Produto
**POST** `/criar-produto`

**Exemplo de requisição:**
```json
{
  "nome": "Notebook",
  "preco": 3500.00,
  "quantidade": 2
}
```

**Resposta de sucesso (201):**
```json
{
  "id": 1,
  "nome": "Notebook",
  "preco": 3500.00,
  "quantidade": 2,
}
```

### 2. Listar Produtos
**GET** `/listar-produtos`

**Resposta de sucesso (200):**
```json
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
```

### 3. Alterar Quantidade de um Produto
**POST** `/alterar-quantidade-produto`

**Exemplo de requisição:**
```json
{
  "nome": "Notebook",
  "quantidade": 3
}
```

**Resposta de sucesso (200):**
```json
{
  "id": 1,
  "nome": "Notebook",
  "preco": 3500.00,
  "quantidade": 3,
}
```

### 4. Remover Produto
**DELETE** `/remover-produto-nome`

**Exemplo de requisição:**
```url
/remover-produto-nome?nome=nome
```

**Resposta de sucesso (200):**
```json
{
  "mensagem": "Produto removido com sucesso"
}
```

## 🧪 Executando os Testes

```bash
# Executar todos os testes
npm test
```

## 🐳 Docker

### Iniciar os containers
```bash
docker-compose up -d
```

### Parar os containers
```bash
docker-compose down
```

### Visualizar logs do container
```bash
docker logs -f postgres_carrinho
```

## 📝 Notas Adicionais

- A API segue os princípios RESTful
- Todas as respostas são em formato JSON
- Os preços são sempre em formato decimal com duas casas decimais
- As datas seguem o formato ISO 8601
