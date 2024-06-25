FROM node:16-alpine

WORKDIR /app

COPY . .


RUN yarn install

RUN yarn run build

EXPOSE 3000

CMD ["yarn","start"]