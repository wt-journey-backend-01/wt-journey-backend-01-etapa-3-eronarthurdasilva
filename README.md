# Sistema de Gerenciamento  Policial 

API RESTful para gerenciamento de agentes e casos policiais, desenvolvido com:

- Node.js + Express
- Arquitetura MVC
- Armazenamento em memória (utilizando arrays)
- Front-end (Basico) com html, Tailwind CSS e JavaScript

## Funcionalidades Principais 

### Para Agentes:

- CRUD completo de agentes, create/update/delete/read (leitura feita pelo id do agente)
- Filtros por cargos
- Ordenação por data de Incorporação

### Para Casos

- CRUD completo de casos, create/update/delete/read (leitura feita pelo id do caso)
- Controle de Status (aberto/solucionado/arquivado)
- Filtros por agentes, status e busca textual

### Extras
- Documentação Swagger em ´/docs´
- Interface Web Responsiva
- Validações robustas

## Instalação 

Pré-requisitos:
- Node.js (v18+)
- npm (v9+)

### Passo a passo
# 1. Clone o repositório
git clone https://github.com/seu-usuario/departamento-policial.git

# 2. Acesse a pasta do projeto
cd departamento-policial

# 3. Instale as dependências
npm install

# 4. Inicie o servidor
npm start

# Para desenvolvimento (com reinício automático):
npm run dev

## Implementação 

Estrutura do Projeto 
📦 src
├── 📂 controllers
├── 📂 repositories
├── 📂 routes
├── 📂 public
├── 📂 docs
├── server.js
└── package.json

## Como cada parte foi implementada 
### 1. Configuração inicial 
  npm init -y
  npm install express
  npm install -D nodemon
  
### 2. Modelagem de dados 
```JavaScript
const agentes = [
  {
    id: "1",
    nome: "João Silva",
    dataDeIncorporacao: "2020-05-15",
    cargo: "inspetor"
  }
];
```

### 3. Rotas principais 
```JavaScript
// routes/agentesRoutes.js
router.get('/agentes', agentesController.getAllAgentes);
router.post('/agentes', agentesController.createAgente);
```

### 4. Validações
```JavaScript
// controllers/agentesController.js
if (!nome || !dataDeIncorporacao || !cargo) {
  return res.status(400).json({ message: "Todos os campos são obrigatórios" });
}
```

### 5. Front-End

- HTML semântico
- Tailwind CSS para estilização
- Fetch API para comunicação com o backend

### 6. Documentação 
npm install swagger-ui-express swagger-jsdoc

```JavaScript
// docs/swagger.js
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Policial',
      version: '1.0.0'
    }
  },
  apis: ['./routes/*.js']
};
```

### Como testar
# Modo produção
npm start

# Modo desenvolvimento
npm run dev

Acesse:

API: http://localhost:3000

Front-end: http://localhost:3000

Documentação: http://localhost:3000/docs

Obs: Pode trocar a saida se preferir 

### Rotas da API
- Pode ser usado o Insomnia ou algum aplicativo de sua preferencia 
Método	Endpoint	Descrição
GET	/agentes	Lista todos agentes
POST	/agentes	Cria novo agente
GET	/casos?status=aberto	Filtra casos

## Parte dois do projeto 

### Descrição

Nesta etapa, desenvolvi um sistema de gerenciamento policial mais robusto, incorporando novas funcionalidades, gerenciando agentes e casos utilizando um banco de dados relacional (PostgreSQL) para armazenamento persistente.
Os dados são armazenados em tabelas, permitindo consultas mais complexas e eficientes.
Também utilizamos o Sequelize como ORM para facilitar a interação com o banco de dados, docker para containerização e gerenciamento de dependências.

### Estrutura do projeto atualizada
DepartamentoPolicial
├── controllers/ # Lógica de negócio
├── db/
│ ├── migrations/ # Estrutura do banco
│ ├── seeds/ # Dados iniciais
│ └── db.js # Configuração do Knex
├── repositories/ # Acesso ao banco de dados
├── routes/ # Definição de rotas
├── utils/ # Funções auxiliares
├── docker-compose.yml # Subida do banco via Docker
├── knexfile.js # Configuração do Knex
├── server.js # Entrada da aplicação
├── package.json # Dependências e scripts
└── .env # Variáveis de ambiente

### Tecnologias Utilizadas

#### **Backend**
- **Node.js** → Plataforma para executar o JavaScript no lado do servidor.
- **Express** → Framework minimalista para criação das rotas e middleware.
- **Knex.js** → Query Builder para facilitar operações no banco de dados.
- **Dotenv** → Para carregar variáveis de ambiente do arquivo `.env`.

#### **Banco de Dados**
- **PostgreSQL** → Banco relacional usado para persistência dos dados.
- **Migrations** (Knex) → Controle de versão da estrutura do banco.
- **Seeds** (Knex) → Inserção de dados iniciais para teste e desenvolvimento.

#### **Ambiente e Ferramentas**
- **Docker** → Para subir o banco PostgreSQL isolado em um container.
- **Docker Compose** → Automatiza a criação e configuração do banco.
- **WSL2** → Necessário no Windows para rodar Docker de forma eficiente.

#### **Organização do Código**
- **Controllers** → Contêm a lógica de negócio e regras de cada recurso.
- **Repositories** → Lidam com a comunicação com o banco usando Knex.
- **Routes** → Definem os endpoints da API.
- **Utils** → Funções utilitárias (como tratamento de erros).
- **Migrations** → Definem as tabelas `agentes` e `casos` com suas colunas e relacionamentos.
- **Seeds** → Inserem registros iniciais (mínimo 2 agentes e 2 casos).

#### **Testes**
- **Jest** → Framework de testes para garantir a qualidade do código.
- **Supertest** → Para testar as rotas da API.

### Como executar o projeto
As instruções se encontram no INSTRUCOES.README, onde estara passo a passo de como executar o projeto.

### Funcionalidades extras

- **Autenticação** → Implementação de JWT para proteger rotas.
- **Paginação** → Suporte a paginação nas listagens.
- **Filtros** → Possibilidade de filtrar agentes e casos por diferentes critérios.
- **Busca** → Implementação de busca textual nos casos.
- **Notificações** → Sistema de notificações para atualizações de casos.


### Melhorias Futuras

- **Documentação** → Melhorar a documentação da API com exemplos de uso.
- **Testes** → Aumentar a cobertura de testes, incluindo testes de integração.
- **Desempenho** → Otimizar consultas ao banco de dados para melhorar o desempenho.
- **Escalabilidade** → Preparar a aplicação para escalar horizontalmente.
- **Monitoramento** → Implementar ferramentas de monitoramento e logging.
