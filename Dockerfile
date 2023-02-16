FROM node:14.4-alpine

WORKDIR /app

COPY ./package*.json ./

ENV NODE_ENV=development

RUN apk add --update nodejs npm; npm install -g ; npm i vite


EXPOSE 8080

CMD [ "npm", "run", "dev"]