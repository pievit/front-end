FROM node:18.8.0-alpine

WORKDIR /app

COPY ./package*.json ./

ENV NODE_ENV=development

RUN apk add --no-cache curl
#RUN curl -L https://www.npmjs.com/install.sh | sh
RUN npm install -clear
#RUN npm install --clear



CMD [ "npm", "run", "dev"]