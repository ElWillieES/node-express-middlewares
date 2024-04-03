FROM node:20.11.1-alpine3.19

WORKDIR /usr/src/app

COPY app/package*.json .
RUN npm install

COPY app/ .

EXPOSE 3000

CMD ["npm", "start"]