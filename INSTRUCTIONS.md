# Instruções de Setup e Execução

Este documento descreve os passos necessários para configurar e rodar a aplicação do Departamento de Polícia.

## Pré-requisitos

- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/) instalados.
- [Node.js](https://nodejs.org/) (versão 14 ou superior) e [NPM](https://www.npmjs.com/) instalados.

## 1. Configuração do Ambiente

Primeiro, clone o repositório e instale as dependências do projeto.

```bash
# Navegue para a pasta do projeto
cd <nome-do-repositorio>

# Instale as dependências
npm install
```

## 2. Subir o Banco de Dados com Docker

O banco de dados PostgreSQL é gerenciado via Docker Compose. Para iniciá-lo, execute o seguinte comando na raiz do projeto:

```bash
docker-compose up -d
```

## 3. Executar Migrations

As migrations criam a estrutura de tabelas no banco de dados. Para aplicá-las, execute:

```bash
npm run migrate
```

## 4. Rodar Seeds

Os seeds populam o banco de dados com dados iniciais. Para executá-los, use:

```bash
npm run seed
```

## 5. Iniciar o Servidor

Com tudo pronto, inicie a API:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.