# Teste Invillia Node

Api para gerenciamento de torneios, onde é possivel cadastrar usuários, sendo eles organizadores ou players.

Os organizadores podem criar torneios, etapas dos torneios e cadastrar a pontuação.

É possivel também ver o ranking por etapa e o ranking geral do torneio que é a soma das etapas.

A pontuação é feita na ordem inversa, onde o primeiro lugar ganha a pontuação referente ao número de participantes da etapa, o segundo lugar recebe a pontuação do primeiro lugar menos 1 e assim sucessivamente.

Por exemplo, em alguma etapa participaram 8 jogadores, o ranking da etapa ficaria assim:

- 1° Lugar - 8 pontos
- 2° Lugar - 7 pontos
- 3° Lugar - 6 pontos
- 4° Lugar - 5 pontos
- 5° Lugar - 4 pontos
- 6° Lugar - 3 pontos
- 7° Lugar - 2 pontos
- 8° Lugar - 1 pontos

## Tecnologias

- NodeJs
- Typescript
- Sequelize
- Jest
- Gulp

## Start

- Instalar depedencias: `yarn`
- Limpar Banco de Dados: `yarn cleardb` (se necessario)
- Recriar Banco de Dados: `yarn createdb` (apenas se executar o passo anterior)
- Gerar a Build do Projeto: `yarn build`
- Iniciar o projeto: `yarn start`

## Tests

- Instalar depedencias: `yarn`
- Executar testes: `yarn test`

## Develop

- Instalar depedencias: `yarn`
- Limpar Banco de Dados: `yarn cleardb` (se necessario)
- Recriar Banco de Dados: `yarn createdb` (apenas se executar o passo anterior)
- Iniciar o projeto com nodemon: `yarn dev`

## Endpoints

### Cadastrar Usuário

http://localhost:3333/users **POST**

**Dados Enviados**

```json
{
  "name": "Joao",
  "email": "joao@gmail.com",
  "password": "123456",
  "organizer": true //variavel opcional, true apenas se for organizador
}
```

**Dados Retornados**

```json
{
  "id": 1,
  "name": "Joao",
  "email": "joao@email.com",
  "organizer": true
}
```

**Erros Esperados**

```json
 { "error": "User already exists." } 400 Bad Request
 { "error": "Name is Required" } 400 Bad Request
 { "error": "Email is Required" } 400 Bad Request
 { "error": "Password is Required" } 400 Bad Request
```

### Listar Usuários

http://localhost:3333/users **GET**

**Dados Retornados**

```json
[
  {
    "id": 1,
    "name": "Joao",
    "email": "joao@email.com",
    "organizer": true
  },
  {
    "id": 2,
    "name": "Joao1",
    "email": "joao1@email.com",
    "organizer": false
  }
]
```

### Criar Torneio

http://localhost:3333/tournaments **POST**

**Dados Enviados**

```json
{
  "name": "Torneio Invillia"
}
```

**Dados Retornados**

```json
{
  "id": 1,
  "name": "Torneio Invillia"
}
```

**Erros Esperados**

```json
 { "error": "You can only create tournament with organizer" } 401 Bad Request
 { "error": "Tournament already exists." } 400 Bad Request
 { "error": "Email is Required" } 400 Bad Request
```

### Listar Torneios

http://localhost:3333/tournaments **GET**

**Dados Retornados**

```json
[
  {
    "id": 1,
    "name": "Torneio Invillia"
  },
  {
    "id": 2,
    "name": "Torneio Joao"
  }
]
```

### Criar Etapa

http://localhost:3333/steps **POST**

**Dados Enviados**

```json
{
  "name": "Etapa 1",
  "tournament_id": 1
}
```

**Dados Retornados**

```json
{
  "id": 1,
  "name": "Etapa 1",
  "tournament_id": 1
}
```

**Erros Esperados**

```json
 { "error": "You can only create step with organizer" } 401 Bad Request
 { "error": "This tournament not exists." } 400 Bad Request
 { "error": "Step already exists." } 400 Bad Request
 { "error": "Name is Required" } 400 Bad Request
 { "error": "Tournament is Required" } 400 Bad Request
```

### Listar Etapas

http://localhost:3333/steps/:tournamentId **GET**

**Dados Retornados**

```json
[
  {
    "id": 1,
    "name": "Etapa 1",
    "tournament": {
      "name": "Torneio Invillia"
    }
  },
  {
    "id": 2,
    "name": "Etapa 2",
    "tournament": {
      "name": "Torneio Invillia"
    }
  }
]
```

**Erros Esperados**

```json
 { "error": "This tournament not exists." } 400 Bad Request
 { "error": "Params tournamentId need to be number." } 400 Bad Request
```

### Criar Posições

http://localhost:3333/positions/:stepId **POST**

**Dados Enviados**

```json
[
  {
    "user_id": 1,
    "position": 1
  },
  {
    "user_id": 2,
    "position": 2
  }
]
```

**Dados Retornados**

```json
[
  {
    "user_id": 1,
    "step_id": 1,
    "position": 1
  },
  {
    "user_id": 2,
    "step_id": 1,
    "position": 2
  }
]
```

**Erros Esperados**

```json
 { "error": "You can only create positions with organizer" } 401 Bad Request
 { "error": "This tournament not exists." } 400 Bad Request
 { "error": "Positions for this step already exists." } 400 Bad Request
 { "error": "Some user does not exist" } 400 Bad Request
 { "error": "User is Required" } 400 Bad Request
 { "error": "Position is Required" } 400 Bad Request
 { "error": "Position is repeated" } 400 Bad Request
 { "error": "User is repeated" } 400 Bad Request
 { "error": "Params stepId need to be number" } 400 Bad Request
```

### Lista Ranking Por Etapa

http://localhost:3333/steprank/:stepId **GET**

**Dados Retornados**

```json
{
  "tournament": "Torneio Invillia",
  "step": "Etapa 1",
  "ranking": [
    {
      "position": 1,
      "name": "Joao",
      "points": 3
    },
    {
      "position": 2,
      "name": "Joao1",
      "points": 2
    },
    {
      "position": 3,
      "name": "Joao2",
      "points": 1
    }
  ]
}
```

**Erros Esperados**

```json
 { "error": "This step not exists." } 400 Bad Request
 { "error": "Params stepId need to be number" } 400 Bad Request
```

### Lista Ranking Por Torneio

http://localhost:3333/tournamentrank/:tournamentId **POST**

```json
{
  "tournament": "Torneio Invillia",
  "steps": ["Etapa 1", "Etapa 2", "Etapa 3", "Etapa 4", "Etapa 5"],
  "ranking": [
    {
      "position": 1,
      "name": "Joao",
      "points": 12
    },
    {
      "position": 2,
      "name": "Joao1",
      "points": 8
    },
    {
      "position": 3,
      "name": "Joao2",
      "points": 4
    }
  ]
}
```

**Erros Esperados**

```json
 { "error": "This tournament not exists." } 400 Bad Request
 { "error": "Params tournamentId need to be number" } 400 Bad Request
```

### Postman

teste-invillia-node.postman_collection.json

## TODO

- ~~Terminar a rota tournamentrank~~
- ~~Melhorar os retornos das rotas de ranking trazendo a etapa e o torneio~~
- ~~Criar Validação com JWT~~
- ~~Refatorar o Model de usuario para definir se é organizador ou não.~~
- ~~Refatorar os Controller de criar torneio etapa e pontuação para só o organizador alterar~~
- ~~Criar middlewares de validação com yup~~
- ~~Criar Teste~~
- ~~Criar validaçẽos de parametros nos controller~~
- ~~Criar Documentação de Rotas~~

### OBS

Usei o banco de dados sqlite, para não precisar de nenhuma instalação ou configuração adicional.

Contabilidade hora 2h + 30min + 4h 30min + 5h = 12h
