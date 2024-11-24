# bondy-desafio-fullstack

## Front-end

## O Sistema
O frontend utiliza React.js, GraphQL desenvolvida com Node.js (versão 18).

## Finalidade do Sistema:

Este sistema tem como objetivo permitir o gerenciamento e exibição de informações de usuários. 

Funcionalidades Principais

- Autenticação de Usuários:
- Exibição de Dados do Usuário:
- Tratamento de Erros:
- Interface Intuitiva e Consistente:

## Principais Tecnologias
- React
- Apollo Client
- GraphQL

## Casos de Uso

- Login de Usuário:

    O usuário entra com seu e-mail e senha na página de login.
    O sistema verifica as credenciais e, se válidas, retorna um token de autenticação.
    O token é armazenado no localStorage e o usuário é redirecionado para a página de detalhes do usuário.

- Exibição de Dados do Usuário:

    Após o login, o sistema utiliza o token para buscar os dados do usuário com a query GET_ME_QUERY via Apollo Client.
    Os dados pessoais (nome, e-mail, empresa) do usuário autenticado são exibidos na página de detalhes do usuário.

- Mensagens de Erro:
    
    O sistema exibe mensagens de erro customizadas em caso de falha no login, como:
        "Senha ou e-mail fornecidos inválidos".
        "Senha não fornecida".
    Caso o usuário não esteja autenticado ou haja outro erro, são exibidas mensagens apropriadas.

- Autenticação e Navegação Protegida:

    O sistema garante que apenas usuários autenticados possam acessar páginas protegidas, como a página de detalhes do usuário. O token de autenticação é utilizado para realizar as consultas protegidas.

## Siga os passos abaixo para executar o projeto

_Antes de prosseguir, verifique se está utilizando a versão LTS do Node.js 18 (18.20)._


1. Renomeie o arquivo da raiz do projeto chamado .env.example para .env.
2. Inicie as dependências do projeto
```
yarn install
```
3. Inicie o servidor
```
yarn run start
```

## Estrutura de diretórios

```
├── /public
├── /src
|   ├── /apollo
|   ├── /components
|   ├── /graphql
|   |   ├── /muations
|   |   ├── /queries
|   ├── /hooks
|   |   ├── /Auth
|   ├── /pages
```