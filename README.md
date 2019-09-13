# Teste Invillia Node

Api para cadastros de toneios, etapas e pontuações

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

Para mais detalhes dos endpoints esta no arquivo postman

teste-invillia-node.postman_collection.json

### OBS

Usei o banco de dados sqlite, para não precisar de nenhuma instalação ou configuração adicional.

Projeto incompleto ao final das duas horas, faltou a logica de retorna o ranqueamento do torneio.

O projeto sera continuado na branch extra e sera computado o tempo total nessa branch para finalizar todos os requisitos.
