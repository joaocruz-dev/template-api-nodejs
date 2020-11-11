FROM node:alpine

WORKDIR /app

COPY ./dist .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]