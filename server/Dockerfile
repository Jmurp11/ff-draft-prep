# Stage 1
FROM node:12.7-alpine as node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install -g nodemon

RUN npm install -g typescript

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "start" ]

