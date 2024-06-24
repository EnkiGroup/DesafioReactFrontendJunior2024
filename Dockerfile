# Use uma imagem oficial do Node.js como base
FROM node:16.20.2-bullseye

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Instala as dependências do projeto
RUN npm install


# Compila a aplicação React para produção
RUN npm run build

# Expõe a porta 3000 para fora do container
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm","run", "start-tests"]
