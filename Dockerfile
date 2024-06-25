# Etapa 1: Build da aplicação
FROM node:14 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia package.json e yarn.lock
COPY package.json yarn.lock ./

# Instala as dependências
RUN yarn install

# Copia o restante do código da aplicação
COPY . .

RUN yarn start

EXPOSE 3000

