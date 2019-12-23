# Stage 1
FROM node:10.9 as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run ng build -- --prod --output-path=dist

# Stage 2
FROM nginx:1.14.1-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=node /usr/src/app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]
