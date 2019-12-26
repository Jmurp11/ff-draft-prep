# Stage 1
FROM node:12.7-alpine as node

COPY package*.json ./

RUN npm install -g nodemon

RUN npm install -g typescript

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "start" ]

