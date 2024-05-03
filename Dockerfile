FROM node:slim

MAINTAINER Jacqueline Park

WORKDIR /app

COPY dal.js /app/dal.js

COPY index.js /app/index.js

COPY package.json /app/package.json

RUN npm install

COPY . .


