FROM node:14.4-alpine

WORKDIR /app

ENV NODE_ENV=development

RUN npm install -g

EXPOSE 8080

CMD [ "npm", "run", "serve"]