FROM node:16.20.0-alpine3.14

WORKDIR /app

COPY . .


RUN yarn install

RUN yarn run build

EXPOSE 3000

CMD ["yarn","start"]