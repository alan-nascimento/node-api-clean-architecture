FROM node:lts-alpine

WORKDIR /usr/app/node-api-clean-architecture

COPY ./package.json .

RUN npm install --only=prod

COPY ./dist ./dist

EXPOSE 5000

CMD npm start
