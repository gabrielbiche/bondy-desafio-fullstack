# bondy-desafio-fullstack

## Back-end

### O Sistema
O backend é uma API GraphQL desenvolvida com Node.js (versão 18) e utiliza MongoDB como banco de dados. Ele está configurado para executar localmente com o Serverless Framework e tem suporte a testes unitários e migrações.

### Finalidade da API
A API bondy-desafio-fullstack foi desenvolvida para gerenciar autenticação de usuários e fornecer operações básicas para logar e buscar informações relacionadas a usuários. Ela serve como um backend para sistemas que exigem autenticação segura e operações com dados de usuário.

#### Funcionalidades Principais

- Autenticação de Usuários:
- - Login de usuários com validação de credenciais.
- - Middleware para proteger rotas com autenticação baseada em tokens.

- Gerenciamento de Usuários:
- - Consultar informações de usuários autenticados.

- Suporte a Migrações: 
- - Scripts de migração para facilitar alterações no banco de dados.

- API GraphQL: 
- - Schema bem estruturado com suporte a queries e mutations para interagir com os dados de forma flexível.

### Principais Tecnologias
- GraphQL
- Mongoose
- bcrypt
- Jest
- Serverless Framework

### Casos de Uso

Na raiz do projeto, você encontrará um arquivo chamado README.example.md. Este arquivo contém exemplos detalhados de como utilizar as queries e mutations disponíveis na API, incluindo exemplos de requisições e respostas esperadas. Ele serve como referência prática para integrar e testar as funcionalidades implementadas.

### Siga os passos abaixo para executar o projeto

_Antes de prosseguir, verifique se está utilizando a versão LTS do Node.js 18 (18.20)._

1. Renomeie o arquivo da raiz do projeto chamado .env.example para .env.
2. Inicie as dependências do projeto
```
yarn install
```
3. Execute a migração para criar o usário
```
yarn run db:migrate
```
  _Observação: Para desfazer a migrção use `yarn run db:revert`._

4. Inicie o servidor
```
yarn run start
```

### Scripts de Teste

Executar todos os testes com detalhes
```
yarn run test
```

Executar testes com relatório de cobertura
```
yarn run test:coverage
```

### Estrutura de diretórios
```
├── /src
|   ├── /common
|   |   ├── /constants
|   |   ├── /errors
|   ├── /config
|   ├── /graphql
|   |   ├── /middleware
|   |   ├── /types
|   ├── /interfaces
|   ├── /migrations
|   ├── /models
|   |   ├── /Auth
|   |   |   ├──/__tests__
|   |   |   ├──/resolvers
|   |   ├── /Migration
|   |   ├── /User
|   |   |   ├──/__tests__
|   |   |   ├──/resolvers
```
- common: Reúne constantes, erros genéricos, e utilitários de migração.
- config: Centraliza as configurações, como conexão ao banco de dados.
- graphql: Contém os tipos, schema e middlewares, além dos resolvers.
- interfaces: Define contratos para tipagem TypeScript (interfaces para autenticação, contexto, etc.).
- migrations: Representação de um modelo de migração de banco de dados, para gerenciar mudanças.
- models: Implementa a lógica de negócios, incluindo a modelagem de dados, serviços e testes unitários.