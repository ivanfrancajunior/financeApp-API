<h1 align="center" style="font-weight: bold;">MY Finance api </h1>
<p align="center">
 <a href="#tech">Technologies</a> •
 <a href="#started">Getting Started</a> •
  <a href="#routes">API Endpoints</a> •
 <a href="#colab">Collaborators</a> •
 <a href="#contribute">Contribute</a>
</p>

<p align="center">
    <b>Esta api de controle de finanças foi desenvolvido para oferecer aos usuários uma ferramenta eficaz para gerenciar e acompanhar seus gastos pessoais. Com funcionalidades que permitem o registro detalhado de receitas e despesas, categorização de transações, e geração de relatórios financeiros claros e compreensivos, o app facilita a visualização e análise dos hábitos de consumo.</b>
</p>

<h2 id="technologies">💻 Technologies</h2>

- **NodeJS**: Plataforma de desenvolvimento backend baseada em JavaScript.
- **Express**: Framework para NodeJS que facilita a construção de APIs.
- **Mongoose**: Biblioteca de modelagem de dados para MongoDB.
- **Eslint**: Ferramenta de linting para manter a qualidade do código JavaScript.
- **Prettier**: Ferramenta de formatação de código para manter um estilo consistente.

<h2 id="started">🚀 Getting started</h2>

Here you describe how to run your project locally

<h3>Prerequisites</h3>

Here you list all prerequisites necessary for running your project. For example:

- [NodeJS](https://github.com/)
- [MongoDB database](https://github.com)

## 📚 Requisitos:

### Módulo de Usuários:

#### Requisitos Funcionais

1. Deve ser possível cadastrar um novo usuário.

#### Regras de Negócio

1. Não deve ser possível cadastrar um usuário com um email já existente.

## Busca de Usuário

#### Requisito Funcional

1. Deve ser possível retornar os dados do usuário solicitante.

#### Regra de Negócio

1. Deve ser possível retornar os dados do usuário apenas se ele estiver logado.

## Atualização de Dados do Usuário

#### Requisito Funcional

1. Deve ser possível atualizar dados de um usuário apenas se ele estiver logado.

#### Regra de Negócio

1. Não deve ser possível alterar o email do usuário.

### Módulo de Transações:

#### Requisitos Funcionais

1. Deve ser possível cadastrar transações realizadas por um usuário.

2. Deve ser possível listar todas as transações por título, tipo e data.

#### Regras de Negócio

1. Não deve ser possível cadastrar uma transação com valor menor que um.

---

<h2 id="routes">📍 API Endpoints</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​
| Route | Description
|----------------------|-----------------------------------------------------
| <kbd>POST /api/users</kbd> | create a new user [request details](#create-detail)
| <kbd>🔒 GET /api/users/me</kbd> | retrieves user info see [response details](#get-user-detail)
| <kbd>POST /api/users/signin</kbd> | authenticate user into the api see [request details](#auth-detail)
| <kbd>🔒 PATCH /api/users</kbd> | update user in [request details](#update-auth-detail)
| <kbd>🔒 POST /api/transactions</kbd> | create a new transaction[request details](#create-transaction-detail)
| <kbd>🔒 GET /api/transactions</kbd> | get all transactions [request details](#get-transactions-detail)
| <kbd>🔒 GET /api/transactions/:id</kbd> | get a transaction by id [request details](#get-transaction-detail)
| <kbd>🔒 PUT /api/transactions/:id</kbd> | update a transaction [request details](#update-transaction-detail)
| <kbd>🔒 DELETE /api/transactions/:id</kbd> | delete a transaction [request details](#delete-transaction-detail)

<h3 id="create-detail">POST /api/users</h3>

**REQUEST**

```json
{
  "name": "test user",
  "email": "email@email.com",
  "password": "123456"
}
```

**RESPONSE**

```json
{
  "name": "test user",
  "password": "$2a$08$vCsTBiZ3kDAWO8/IiQq3oe9ULy9LhZTQJ14blloXCvwShSNMMXcqO",
  "email": "email@email.com",
  "total_balance": 0,
  "_id": "668406fc09cc0e35948520ec",
  "__v": 0
}
```

<h3 id="get-user-detail">GET /api/users/me</h3>

**RESPONSE**

```json
"user": {
        "name": "test user",
        "password": "$2a$08$vCsTBiZ3kDAWO8/IiQq3oe9ULy9LhZTQJ14blloXCvwShSNMMXcqO",
        "email": "email@email.com",
        "total_balance": 0,
        "_id": "668406fc09cc0e35948520ec",
        "__v": 0
    }
```

<h3 id="auth-detail">POST /api/users/signin</h3>

**REQUEST**

```json
{
  "email": "email@email.com",
  "password": "123456"
}
```

**RESPONSE**

```json
{
  "user": {
    "_id": "668406fc09cc0e35948520ec",
    "name": "test user",
    "password": "$2a$08$vCsTBiZ3kDAWO8/IiQq3oe9ULy9LhZTQJ14blloXCvwShSNMMXcqO",
    "email": "email@email.com",
    "total_balance": 0,
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODQwNmZjMDljYzBlMzU5NDg1MjBlYyIsImlhdCI6MTcxOTkyODU5NCwiZXhwIjoxNzIwNTMzMzk0fQ.yWkWfYXW5yhOGrv_VO2mdm7vCc-0yz3vvPar7c9VyDM"
}
```

<h3 id="update-detail">POST /api/users/signin</h3>

**REQUEST**

```json
{
  "name": "My updated username"
}
```

**RESPONSE**

```json
{
  "_id": "668406fc09cc0e35948520ec",
  "name": "My updated username",
  "email": "email@email.com",
  "total_balance": 0,
  "__v": 0
  },

```

<h3 id="create-detail">POST /api/transactions</h3>

**REQUEST**

```json
{
  "title": "one item",
  "type": "income",
  "amount": 200
}
```

<h3 id="create-detail">GET /api/transactions</h3>

**RESPONSE**

```json
[
  {
    "_id": "66841a2a2acb1bae3f214e2a",
    "title": "one item",
    "type": "income",
    "amount": 200,
    "userId": "66840b03f1a35809f1e1bc75",
    "created_at": "2024-07-02T15:18:02.311Z",
    "__v": 0
  }
]
```

<h3 id="create-detail">GET /api/transactions/:id</h3>

**RESPONSE**

```json
{
  "_id": "66841a2a2acb1bae3f214e2a",
  "title": "one item",
  "type": "income",
  "amount": 200,
  "userId": "66840b03f1a35809f1e1bc75",
  "created_at": "2024-07-02T15:18:02.311Z",
  "__v": 0
}
```

<h3 id="create-detail">PUT /api/transactions/:id</h3>

**REQUEST**

```json
{
  "title": "first item"
}
```

**RESPONSE**

```json
  "status": 204
```

<h3 id="create-detail">DELETE /transactions/:id</h3>

**RESPONSE**

```json
  "status": 204
```

<h3>Cloning</h3>

How to clone your project

```bash
git clone https://github.com/ivanfrancajunior/finance_app.git
```

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env` with your AWS Credentials

```yaml
CONNECTION_SRING=sua_chave_de_conexão_com_mongodb
JWT_SECRET=seu_md5_hash
```

<h3>Starting</h3>

How to start your project

```bash
cd project-name
npm install
npm start
```
