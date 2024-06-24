# Desafio teste front-end enContact (TODO LIST)

## Descrição

Este projeto é uma aplicação de Todo List desenvolvida como parte do desafio para a posição de front-end júnior na enContact. A aplicação permite que o usuário adicione, remova e atualize tarefas, além de filtrar tarefas ativas e completadas.

## Deploy

## Tecnologias Utilizadas

- React
- React Router
- React Query
- TypeScript
- SCSS (Sass)
- Node (versão 16.20.0)

## Funcionalidades
- Adicionar uma nova tarefa
- Remover uma tarefa existente
- Atualizar o título de uma tarefa
- Marcar uma tarefa como concluída ou ativa
- Limpar todas as tarefas concluídas
- Alternar entre visualização de todas as tarefas, tarefas ativas e tarefas completadas
- Marcar todas as tarefas como concluídas de uma vez

## Testes implementados
### Testes unitários:
- api.ts
- Hooks (useFetchTodos.ts e useTodoList.ts)
- todoContext.tsx
- footer.tsx
- taskInput.tsx

## Como executar o programa
- Baixe ou clone o projeto na sua máquina
- Vá até o diretório raiz do projeto

Para executar o programa com Docker, certifique-se que está na raiz do projeto e execute os comandos:
- `docker build -t react-todolist-image . `
-  `docker run -p 3000:3000 -d react-todolist-image:latest`

Caso deseje executar diretamente (não recomendável), certifique-se que o Node está em uma versão compatível (16.20.0) e execute os seguintes comandos na raiz do projeto:
- `yarn install`
- `yarn start`

Após isso, o programa será executado na <a> localhost:3000 </a> da sua máquina.