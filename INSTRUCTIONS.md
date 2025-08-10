# Instruções de Setup e Execução

Este documento descreve os passos necessários para configurar e rodar a aplicação do Departamento de Polícia localmente. Siga os passos na ordem correta para garantir que o ambiente funcione como esperado.

## Pré-requisitos

- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/) instalados.
- [Node.js](https://nodejs.org/) (versão 16 ou superior) e [NPM](https://www.npmjs.com/) instalados.

## Passo a Passo para Execução

### 1. Instalar Dependências

Se você acabou de clonar o projeto, o primeiro passo é instalar todas as dependências necessárias.

```bash
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