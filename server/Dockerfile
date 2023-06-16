FROM node:14.18-alpine

WORKDIR /
 
COPY package*.json ./

RUN npm i

COPY . . 

RUN npm run build