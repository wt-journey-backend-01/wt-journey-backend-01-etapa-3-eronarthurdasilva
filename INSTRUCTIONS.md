# 🚀 Instruções de Setup e Execução

<div align="center">

![Sistema de Gerenciamento Policial](https://img.shields.io/badge/Sistema-Gerenciamento_Policial-blue)
![Versão](https://img.shields.io/badge/Versão-2.0.0-brightgreen)

</div>

Este documento fornece instruções detalhadas para configurar e executar o Sistema de Gerenciamento Policial em seu ambiente local.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **[Docker](https://www.docker.com/get-started)** (versão 20.10 ou superior)
- **[Docker Compose](https://docs.docker.com/compose/install/)** (versão 1.29 ou superior)
- **[Node.js](https://nodejs.org/)** (versão 14 ou superior)
- **[NPM](https://www.npmjs.com/)** (versão 6 ou superior)

## 🔧 Passo a Passo

### 1️⃣ Clonar o Repositório

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/departamento-policial.git

# Navegue para a pasta do projeto
cd departamento-policial
```

### 2️⃣ Configuração do Ambiente

```bash
# Instale as dependências do projeto
npm install

# Crie um arquivo .env a partir do exemplo
cp .env.example .env
```

Abra o arquivo `.env` e configure as variáveis de ambiente conforme necessário:

```env
# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Configurações do Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=departamento_policial
```

### 3️⃣ Iniciar o Banco de Dados PostgreSQL

O sistema utiliza PostgreSQL como banco de dados, gerenciado via Docker Compose:

```bash
# Inicie o container do PostgreSQL em modo detached
docker-compose up -d

# Verifique se o container está rodando
docker ps
```

> 💡 **Dica:** Você pode verificar os logs do container com `docker logs <container_id>`

### 4️⃣ Configurar o Banco de Dados

```bash
# Execute as migrations para criar as tabelas
npm run migrate

# Popule o banco com dados iniciais para desenvolvimento
npm run seed
```

### 5️⃣ Iniciar o Servidor

```bash
# Modo desenvolvimento (com hot-reload)
npm run dev

# OU Modo produção
npm start
```

## 🌐 Acessando o Sistema

Após iniciar o servidor, você pode acessar:

- **Interface Web:** [http://localhost:3000](http://localhost:3000)
- **Documentação da API:** [http://localhost:3000/docs](http://localhost:3000/docs)
- **API Endpoints:** [http://localhost:3000/agentes](http://localhost:3000/agentes) e [http://localhost:3000/casos](http://localhost:3000/casos)

## 🧪 Executando Testes

```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm run test:coverage
```

## ⚠️ Solução de Problemas

### Erro de conexão com o banco de dados

Se encontrar problemas de conexão com o PostgreSQL:

1. Verifique se o container Docker está rodando: `docker ps`
2. Verifique as configurações no arquivo `.env`
3. Tente reiniciar o container: `docker-compose restart`

### Porta já em uso

Se a porta 3000 já estiver em uso, altere a variável `PORT` no arquivo `.env`.

## 📚 Recursos Adicionais

- [Documentação do Node.js](https://nodejs.org/en/docs/)
- [Documentação do Express](https://expressjs.com/)
- [Documentação do PostgreSQL](https://www.postgresql.org/docs/)
- [Documentação do Knex.js](https://knexjs.org/)

---

<div align="center">

**Desenvolvido por Eron Arthur da Silva, no projeto com express, Node.js, docker, banco de dados não relacionado, com apoio da  levity**

</div>