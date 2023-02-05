FROM  node:19.6-alpine3.16

WORKDIR /app

COPY ./package.json /app

COPY ./package-lock.json /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]




