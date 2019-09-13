# Teste Invillia Node

Api para gerenciamento de torneios, onde é possivel cadastrar usuários, sendo eles organizadores ou players.

Os organizadores podem criar torneios, etapas dos torneios e cadastrar a pontuação.

É possivel também ver o ranking por etapa e o ranking geral do torneio que é a soma das etapas.

A pontuação é feita na ordem inversa, onde o primeiro lugar ganha a pontuação referente ao número de participantes da etapa, o segundo lugar recebe a pontuação do primeiro lugar menos 1 e assim sucessivamente.

Por exemplo, em alguma etapa participaram 8 jogadores, o ranking da etapa ficaria assim:

1° Lugar - 8 pontos
2° Lugar - 7 pontos
3° Lugar - 6 pontos
4° Lugar - 5 pontos
5° Lugar - 4 pontos
6° Lugar - 3 pontos
7° Lugar - 2 pontos
8° Lugar - 1 pontos

## Start

- Instalar depedencias: `yarn`
- Iniciar o projeto: `yarn dev`

## Endpoints

- http://localhost:3333/users **POST**
- http://localhost:3333/users **GET**

- http://localhost:3333/tournaments **POST**
- http://localhost:3333/tournaments **GET**

- http://localhost:3333/steps **POST**
- http://localhost:3333/steps/:tournamentId **GET**

- http://localhost:3333/positions **POST**

- http://localhost:3333/steprank/:stepId **GET**
- http://localhost:3333/tournamentrank/:tournamentId **POST**

Para mais detalhes dos endpoints está no arquivo postman

teste-invillia-node.postman_collection.json

## TODO

- ~~Terminar a rota tournamentrank~~
- Melhorar os retornos das rotas de ranking trazendo a etapa e o torneio
- Criar Validação com JWT
- Refatorar o Model de usuario para definir se é organizador ou não.
- Refatorar os Controller de criar torneio etapa e pontuação para só o organizador alterar
- Criar middlewares de validação com yup
- Criar Teste
- Criar Documentação de Rotas
- Concertar o erro de lint do sequelize

### OBS

Usei o banco de dados sqlite, para não precisar de nenhuma instalação ou configuração adicional.

Projeto incompleto ao final das duas horas, faltou a logica de retorna o ranqueamento do torneio.

O projeto sera continuado na branch extra e sera computado o tempo total nessa branch para finalizar todos os requisitos.
