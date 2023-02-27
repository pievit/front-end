FROM node:lts-alpine

WORKDIR /app

COPY ./package*.json ./

ENV NODE_ENV=development

RUN apk add --no-cache curl
RUN npm install -g

COPY . .

RUN npm run dev

EXPOSE 8080



CMD [ "npm", "run", "dev"]