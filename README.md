<div align='center'>
    <h1>Expense tracker</h1>
</div>

<p>
# Descrição
Este app de controle de finanças foi desenvolvido para oferecer aos usuários uma ferramenta eficaz para gerenciar e acompanhar seus gastos pessoais. Com funcionalidades que permitem o registro detalhado de receitas e despesas, categorização de transações, e geração de relatórios financeiros claros e compreensivos, o app facilita a visualização e análise dos hábitos de consumo.
</p>

<br>

# Requisitos da Aplicação

## Cadastro de Usuário

### Requisitos Funcionais

1. Deve ser possível cadastrar um novo usuário.

### Regras de Negócio

1. Não deve ser possível cadastrar um usuário com um email já existente.

## Busca de Usuário

### Requisito Funcional

1. Deve ser possível retornar os dados do usuário solicitante.

### Regra de Negócio

1. Deve ser possível retornar os dados do usuário apenas se ele estiver logado.

## Atualização de Dados do Usuário

### Requisito Funcional

1. Deve ser possível atualizar dados de um usuário apenas se ele estiver logado.

### Regra de Negócio

1. Não deve ser possível alterar o email do usuário.

<hr/>

## Cadastro de Transações

### Requisitos Funcionais

1. Deve ser possível cadastrar transações realizadas por um usuário.
2. Deve ser possível listar todas as transações por título, tipo e data.

### Regras de Negócio

1. Não deve ser possível cadastrar uma transação com valor negativo.

<br>

# Tecnologias

- **NodeJS**: Plataforma de desenvolvimento backend baseada em JavaScript.
- **Express**: Framework para NodeJS que facilita a construção de APIs.
- **Mongoose**: Biblioteca de modelagem de dados para MongoDB.
- **Eslint**: Ferramenta de linting para manter a qualidade do código JavaScript.
- **Prettier**: Ferramenta de formatação de código para manter um estilo consistente.
- **Jest**: Framework de testes para assegurar a funcionalidade do código.
- **Swagger**: Ferramenta para documentação de APIs, tornando-as mais compreensíveis e acessíveis.

 <br>

<br>

# Rotas

## `[POST] /api/users`

Cria uma novo usuário, recebendo o `name`, `email`, `password` dela no corpo da requisição.

```json
{
  "name": "user name",
  "email": "user@email.com",
  "password": "user_password"
}
```

## `[POST] /api/users/signin`

Autentica um usuário, recebendo o `email` e `password` no corpo da requisição.

```json
{
  "email": "user@email.com",
  "password": "user_password"
}
```

## `[GET] /api/users/me`

Retorna os dados do usuário requisitante sendo necessário passar no `header` da requisição, o token gerado na autenticação.

## `[PATCH] /api/users`

Atualiza os dados do usuário solicitante sendo necessário ao menos um dos campos com excessão do email que não pode ser alterado.

```json
{
  "name": "new user name",
  "password": "new user password"
}
```

