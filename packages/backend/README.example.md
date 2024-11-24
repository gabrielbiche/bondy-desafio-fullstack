# API GraphQL - Documentação

## Visão Geral
Este documento contém a descrição das operações disponíveis na API, incluindo queries e mutations, com exemplos de uso e respostas esperadas.

## Endpoint Local

**Descrição:** O endpoint para acessar a API localmente é:

**Comentário:** Utilize este endereço para realizar testes e integrações durante o desenvolvimento. Certifique-se de que o servidor está em execução para garantir o acesso ao endpoint. 

```
http://localhost:3000/local/desafio
```

## 1. Mutation: Login
**Descrição:** Realiza a autenticação do usuário e retorna os dados do usário e um token de acesso.

**Comentários:** Certifique-se de que as credenciais estão corretas. O token gerado pode ser usado para autenticação nas demais operações.

**Exemplo de Requisição:**
```
mutation {
	login(email: "desafio@bondy.com.br", password: "123456") {
		token
		user {
			id
			name
			email
			company
		}
	}
}
```

**Resposta Esperada:**
```
{
	"data": {
		"login": {
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDA5ZWUwNTZmNDNmYjgwZTBiNTBkNyIsImVtYWlsIjoiZGVzYWZpb0Bib25keS5jb20uYnIiLCJpYXQiOjE3MzI0NTgwOTgsImV4cCI6MTczMjU0NDQ5OH0.plwUzaEsrwawFKTc7ieFJLXhzHpXrxuhI-herXmvwCQ",
			"user": {
				"id": "67409ee056f43fb80e0b50d7",
				"name": "Usuário teste",
				"email": "desafio@bondy.com.br",
				"company": "Desafio Bondy"
			}
		}
	}
}
```

**Possíveis Erros:**

1. Credenciais Inválidas

Exemplo de Resposta de Erro:
```
{
  "errors": [
    {
      "message": "AUTH_LOGIN_ERROR",
      "locations": [
        { "line": 2, "column": 2 }
      ],
      "path": ["login"],
      "extensions": {
        "code": "UNAUTHORIZED",
        "stacktrace": [
          "GraphQLError: AUTH_LOGIN_ERROR",
          "    at AuthService.login (...)",
          "    at async Object.login (...)"
        ]
      }
    }
  ],
  "data": {
    "login": null
  }
}
```

2. Senha Não Informada

Exemplo de Resposta de Erro:

```
{
  "errors": [
    {
      "message": "USER_PASS_EMPTY",
      "locations": [
        { "line": 2, "column": 2 }
      ],
      "path": ["login"],
      "extensions": {
        "code": "UNAUTHORIZED",
        "stacktrace": [
          "GraphQLError: USER_PASS_EMPTY",
          "    at AuthService.login (...)",
          "    at async Object.login (...)"
        ]
      }
    }
  ],
  "data": {
    "login": null
  }
}
```

## 2. Query: Me

**Descrição:** Retorna os dados do usuário autenticado.

**Comentários:** É necessário incluir o token de autenticação no header da requisição:
```
Authorization: Bearer <token>
```

**Exemplo de Requisição:**
```
query {
	me {
		id
		name
		email
		company
	}
}
```

**Resposta Esperada:**
```
{
	"data": {
		"me": {
			"id": "67409ee056f43fb80e0b50d7",
			"name": "Usuário teste",
			"email": "desafio@bondy.com.br",
			"company": "Desafio Bondy"
		}
	}
}
```

**Possíveis Erros:**

1. Token de autenticação ausente

Exemplo de Resposta de Erro:
```
{
  "errors": [
    {
      "message": "USER_UNAUTHENTICATED",
      "locations": [
        {
          "line": 2,
          "column": 2
        }
      ],
      "path": [
        "me"
      ],
      "extensions": {
        "code": "UNAUTHORIZED",
        "stacktrace": [
          "GraphQLError: USER_UNAUTHENTICATED",
          "    at new BaseError (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:144696:5)",
          "    at new UnauthorizedError (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:144714:5)",
          "    at /home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:144875:11",
          "    at field.resolve (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:143592:22)",
          "    at executeField (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:12179:24)",
          "    at executeFields (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:12130:26)",
          "    at executeOperation (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:12084:18)",
          "    at execute2 (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:11953:24)",
          "    at executeIncrementally (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:143767:39)",
          "    at async execute2 (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:143956:31)"
        ]
      }
    }
  ],
  "data": {
    "me": null
  }
}
```

2. Token de autenticação inválido ou expirado

Exemplo de Resposta de Erro:
```
{
	"errors": [
		{
			"message": "INVALID_OR_EXPIRED_TOKEN",
			"extensions": {
				"code": "UNAUTHORIZED",
				"stacktrace": [
					"GraphQLError: INVALID_OR_EXPIRED_TOKEN",
					"    at new BaseError (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:144696:5)",
					"    at new UnauthorizedError (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:144714:5)",
					"    at buildContext (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:144837:13)",
					"    at async _ApolloServer.executeHTTPGraphQLRequest (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:144531:24)",
					"    at async /home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:41992:28",
					"    at async MessagePort.<anonymous> (file:///home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/node_modules/serverless-offline/src/lambda/handler-runner/worker-thread-runner/workerThreadHelper.js:24:14)"
				]
			}
		}
	]
}
```

## 3. Query: User

**Descrição:** Busca informações de um usuário específico pelo ID.

**Comentários:** É necessário incluir o token de autenticação no header da requisição:
```
Authorization: Bearer <token>
```

**Exemplo de Requisição:**
```
query {
	user(id: "67409ee056f43fb80e0b50d7") {
		id
		name
		email
		company
	}
}
```

**Resposta Esperada:**
```
{
	"data": {
		"user": {
			"id": "67409ee056f43fb80e0b50d7",
			"name": "Usuário teste",
			"email": "desafio@bondy.com.br",
			"company": "Desafio Bondy"
		}
	}
}
```

**Possíveis Erros:**

1. Token de autenticação ausente

Exemplo de Resposta de Erro:
```
{
	"errors": [
		{
			"message": "USER_UNAUTHENTICATED",
			"locations": [
				{
					"line": 2,
					"column": 2
				}
			],
			"path": [
				"user"
			],
			"extensions": {
				"code": "UNAUTHORIZED",
				"stacktrace": [
					"GraphQLError: USER_UNAUTHENTICATED",
					"    at new BaseError (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:144696:5)",
					"    at new UnauthorizedError (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:144714:5)",
					"    at /home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:144875:11",
					"    at field.resolve (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:143592:22)",
					"    at executeField (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:12179:24)",
					"    at executeFields (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:12130:26)",
					"    at executeOperation (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:12084:18)",
					"    at execute2 (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:11953:24)",
					"    at executeIncrementally (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:143767:39)",
					"    at async execute2 (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:143956:31)"
				]
			}
		}
	],
	"data": {
		"user": null
	}
}
```

2. Token de autenticação inválido ou expirado

Exemplo de Resposta de Erro:
```
{
	"errors": [
		{
			"message": "INVALID_OR_EXPIRED_TOKEN",
			"extensions": {
				"code": "UNAUTHORIZED",
				"stacktrace": [
					"GraphQLError: INVALID_OR_EXPIRED_TOKEN",
					"    at new BaseError (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:144696:5)",
					"    at new UnauthorizedError (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:144714:5)",
					"    at buildContext (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:144837:13)",
					"    at async _ApolloServer.executeHTTPGraphQLRequest (/home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:144531:24)",
					"    at async /home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/packages/backend/.esbuild/.build/handler.js:41992:28",
					"    at async MessagePort.<anonymous> (file:///home/gabriel/my-space/bondy/v2/bondy-desafio-fullstack/node_modules/serverless-offline/src/lambda/handler-runner/worker-thread-runner/workerThreadHelper.js:24:14)"
				]
			}
		}
	]
}
```