FROM node:18.8.0-alpine

WORKDIR /app

COPY ./package*.json ./

ENV NODE_ENV=development

RUN apk add --no-cache curl
RUN npm install -g

EXPOSE 8080



CMD [ "npm", "run", "dev"]