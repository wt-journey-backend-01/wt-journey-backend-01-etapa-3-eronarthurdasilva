# 🚨 Sistema de Gerenciamento Policial 🚨

![Versão](https://img.shields.io/badge/versão-2.0-blue)
![Licença](https://img.shields.io/badge/licença-MIT-green)

API RESTful completa para gerenciamento de agentes e casos policiais, desenvolvida com tecnologias modernas e seguindo as melhores práticas de desenvolvimento.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

## 📋 Funcionalidades Principais 

### 👮‍♂️ Para Agentes:

- **CRUD completo** de agentes (create/read/update/delete)
- **Filtros avançados** por cargos (investigador, delegado, perito, escrivão)
- **Ordenação inteligente** por data de incorporação
- **Validações robustas** para todos os campos

### 🔍 Para Casos

- **CRUD completo** de casos com detalhes completos
- **Sistema de status** (aberto/solucionado/arquivado) com transições controladas
- **Filtros múltiplos** por agentes, status e busca textual
- **Associação** entre casos e agentes responsáveis

### 🌟 Extras
- **Documentação Swagger** completa em `/docs`
- **Interface Web Responsiva** com design moderno
- **Validações robustas** em todos os endpoints
- **Persistência de dados** com PostgreSQL
- **Containerização** com Docker para fácil implantação

## 🚀 Instalação 

### Pré-requisitos:
- Docker e Docker Compose
- Node.js (v18+)
- npm (v9+)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/departamento-policial.git

# 2. Acesse a pasta do projeto
cd departamento-policial

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# 4. Inicie o banco de dados PostgreSQL com Docker
docker-compose up -d

# 5. Instale as dependências
npm install

# 6. Execute as migrações e seeds
npm run migrate
npm run seed

# 7. Inicie o servidor
npm start

# Para desenvolvimento (com reinício automático):
npm run dev
```

### Verificação

Após iniciar o servidor, você pode acessar:
- 🌐 **Interface Web**: http://localhost:3000
- 📚 **Documentação API**: http://localhost:3000/docs
- 🔍 **API Endpoints**: http://localhost:3000/agentes e http://localhost:3000/casos

## 🏗️ Arquitetura e Implementação

### Estrutura do Projeto 
```
📦 DepartamentoPolicial
 ┣ 📂 controllers        # Lógica de negócio e manipulação de requisições
 ┣ 📂 repositories       # Camada de acesso a dados (PostgreSQL)
 ┣ 📂 routes             # Definição de endpoints da API
 ┣ 📂 db
 ┃ ┣ 📂 migrations      # Esquemas de tabelas do banco de dados
 ┃ ┣ 📂 seeds           # Dados iniciais para desenvolvimento
 ┃ ┗ 📜 db.js           # Configuração de conexão com o banco
 ┣ 📂 public             # Interface web (HTML, CSS, JavaScript)
 ┣ 📂 docs               # Documentação Swagger
 ┣ 📜 docker-compose.yml # Configuração do container PostgreSQL
 ┣ 📜 knexfile.js        # Configuração do Knex.js
 ┣ 📜 server.js          # Ponto de entrada da aplicação
 ┣ 📜 .env               # Variáveis de ambiente
 ┗ 📜 package.json       # Dependências e scripts
```

### 🔧 Componentes Principais

#### 1. Banco de Dados (PostgreSQL + Knex.js)

```javascript
// db/migrations/20230501_create_agentes.js
exports.up = function(knex) {
  return knex.schema.createTable('agentes', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.date('data_incorporacao').notNullable();
    table.string('cargo').notNullable();
    table.timestamps(true, true);
  });
};
```

#### 2. Repositories (Camada de Acesso a Dados)

```javascript
// repositories/agentesRepository.js
const knex = require('../db/db');

module.exports = {
  async findAll(filters = {}) {
    const query = knex('agentes');
    
    if (filters.cargo) {
      query.where('cargo', filters.cargo);
    }
    
    return query.orderBy('data_incorporacao', filters.sort || 'desc');
  },
  
  async findById(id) {
    return knex('agentes').where('id', id).first();
  },
  
  // Outros métodos: create, update, remove, partialUpdate
};
```

#### 3. Controllers (Lógica de Negócio)

```javascript
// controllers/agentesController.js
const agentesRepository = require('../repositories/agentesRepository');

module.exports = {
  async getAllAgentes(req, res) {
    try {
      const { cargo, sort } = req.query;
      const agentes = await agentesRepository.findAll({ cargo, sort });
      return res.json(agentes);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  
  // Outros métodos: getAgenteById, createAgente, updateAgente, deleteAgente
};
```

#### 4. Rotas (API Endpoints)

```javascript
// routes/agentesRoutes.js
const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');

router.get('/agentes', agentesController.getAllAgentes);
router.get('/agentes/:id', agentesController.getAgenteById);
router.post('/agentes', agentesController.createAgente);
router.put('/agentes/:id', agentesController.updateAgente);
router.patch('/agentes/:id', agentesController.partialUpdateAgente);
router.delete('/agentes/:id', agentesController.deleteAgente);

module.exports = router;
```

#### 5. Front-End (Interface Web)

- **HTML5 semântico** para estrutura da página
- **Tailwind CSS** para estilização moderna e responsiva
- **JavaScript** com Fetch API para comunicação assíncrona com o backend
- **Componentes interativos** para melhor experiência do usuário

#### 6. Documentação (Swagger)

```javascript
// docs/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de Gerenciamento Policial API',
      version: '2.0.0',
      description: 'API para gerenciamento de agentes e casos policiais'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
```

## 🧪 Testes e Execução

### Ambiente de Produção

```bash
# Inicia o servidor em modo produção
npm start
```

### Ambiente de Desenvolvimento

```bash
# Inicia o servidor com hot-reload para desenvolvimento
npm run dev

# Executa as migrações do banco de dados
npm run migrate

# Popula o banco com dados iniciais
npm run seed
```

## 🔌 API Endpoints

### Agentes

| Método | Endpoint | Descrição | Parâmetros de Query |
|--------|----------|-----------|-----------------|
| GET | `/agentes` | Lista todos os agentes | `cargo`, `sort` |
| GET | `/agentes/:id` | Obtém um agente específico | - |
| POST | `/agentes` | Cria um novo agente | - |
| PUT | `/agentes/:id` | Atualiza um agente completamente | - |
| PATCH | `/agentes/:id` | Atualiza parcialmente um agente | - |
| DELETE | `/agentes/:id` | Remove um agente | - |

### Casos

| Método | Endpoint | Descrição | Parâmetros de Query |
|--------|----------|-----------|-----------------|
| GET | `/casos` | Lista todos os casos | `status`, `agente_id`, `sort` |
| GET | `/casos/:id` | Obtém um caso específico | - |
| POST | `/casos` | Cria um novo caso | - |
| PUT | `/casos/:id` | Atualiza um caso completamente | - |
| PATCH | `/casos/:id/status` | Atualiza apenas o status de um caso | - |
| DELETE | `/casos/:id` | Remove um caso | - |

### Exemplos de Requisições

#### Criar um novo agente

```bash
curl -X POST http://localhost:3000/agentes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria Oliveira","data_incorporacao":"2022-03-15","cargo":"detetive"}'
```

#### Buscar casos por status

```bash
curl -X GET "http://localhost:3000/casos?status=em_andamento&sort=desc"
```

## 🔄 Evolução do Projeto

### Fase 1: API REST com Armazenamento em Memória
- Implementação inicial com Express.js
- Estrutura MVC
- Armazenamento temporário em arrays
- Interface web básica

### Fase 2: Persistência com PostgreSQL e Knex.js
- Configuração do Docker para o PostgreSQL
- Implementação de migrations e seeds com Knex.js
- Refatoração dos repositories para usar o banco de dados
- Melhorias na interface do usuário
- Validações robustas de dados
- Documentação completa com Swagger

## 🚀 Tecnologias Utilizadas

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Knex.js](https://img.shields.io/badge/Knex.js-E16426?style=for-the-badge&logo=knex&logoColor=white)

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Ambiente e DevOps
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

### Documentação e Qualidade
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

### Testes
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-000000?style=for-the-badge&logo=testing-library&logoColor=white)

## 🔮 Melhorias Futuras

- **🔐 Autenticação e Autorização**
  - Implementação de JWT para autenticação segura
  - Níveis de acesso baseados em cargos
  - Proteção de rotas sensíveis

- **📊 Logs e Monitoramento**
  - Sistema de logs estruturados com Winston
  - Monitoramento de performance com Prometheus
  - Dashboard de métricas com Grafana

- **🧪 Testes Automatizados**
  - Testes unitários para todas as funções
  - Testes de integração para fluxos completos
  - Testes end-to-end para validação da interface

- **🔄 CI/CD Pipeline**
  - Integração contínua com GitHub Actions
  - Deploy automatizado para ambientes de staging e produção
  - Verificações de qualidade de código

- **📱 Aplicativo Móvel**
  - Versão mobile para acesso em campo
  - Notificações push para atualizações de casos
  - Funcionalidades offline

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

<p align="center">Desenvolvido por Eron Arthur da Silva, no projeto com express, Node.js, docker, banco de dados não relacionado, com apoio da  levity</p>

