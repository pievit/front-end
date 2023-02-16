FROM node:14.4-alpine

WORKDIR /app

COPY ./package*.json ./

ENV NODE_ENV=development

RUN apk add --no-cache curl
RUN apk add --update nodejs-current
RUN curl -L https://www.npmjs.com/install.sh | sh
RUN npm -v
RUN npm install -g ; npm i vite


EXPOSE 8080

CMD [ "npm", "run", "dev"]