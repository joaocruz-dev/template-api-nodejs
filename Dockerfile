FROM node:alpine

WORKDIR /server

COPY ./dist .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]