# Solução front-end enContact

Esta minha solução para o desafio proposto [desafio proposto](https://github.com/EnkiGroup/DesafioReactFrontendJunior2024).
Este domento visa facilitar a execução do código.

## Execução com docker

Afim de evitar problemas de incompatibilidade com a versão do node , do sistema operacional ou qualquer outra particularidade do ambiente , recomendo que execute a aplicação com o docker , para isso é necessário [ter o docker instalado em sua máquina](https://www.docker.com/products/docker-desktop/) e utilizar os seguites comandos :

### Executar docker-compose

```bash
docker compose -f "docker-compose.yml" up -d --build
```
## OU

### Execute o docker-compose em modo iterartivo para ver o resultado dos testes

```bash
docker compose -f "docker-compose.yml" up --build
```

### Interromper containers criados pelo docker-compose

```bash
docker compose --file 'docker-compose.yml' down
```

ao executar o docker-compose a aplicação estara rodando em localhost:3000

## Execução sem docker

Recomendo utilizar a versão 16.20.2 do node para evitar problemas de incompatibilidade

### Instala as dependências do projeto

```bash
npm install
```

### Execute os testes

```bash
npm run test
```


### Comando para iniciar a aplicação

```bash
npm npm start
```
