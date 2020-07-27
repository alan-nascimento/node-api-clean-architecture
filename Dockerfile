FROM node:lts-alpine

WORKDIR /usr/app/node-api-clean-architecture

COPY ./package.json .

RUN npm install --only=prod
