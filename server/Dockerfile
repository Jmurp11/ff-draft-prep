# Stage 1
FROM node:12.7-alpine as node

COPY package*.json ./

RUN npm install -g typescript

RUN npm install

ENV set NODE_OPTIONS=--max_old_space_size=8192

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "start" ]

