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

# Build da aplicação
RUN yarn build

# Etapa 2: Execução da aplicação
FROM node:14

# Define o diretório de trabalho

WORKDIR /app

# Copia o build da aplicação

COPY --from=build /app/build ./build

# Instala o serve

RUN yarn global add serve

# Define o comando de execução da aplicação

CMD ["serve", "-s", "build", "-l", "3000"]

# Define a porta que a aplicação irá expor

EXPOSE 3000

