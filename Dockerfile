FROM node:14.4-alpine

WORKDIR /app

COPY ./package*.json ./

ENV NODE_ENV=development

RUN apt-get install -y nodejs; npm install -g ; npm i vite


EXPOSE 8080

CMD [ "npm", "run", "dev"]