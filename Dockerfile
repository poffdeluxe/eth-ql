FROM node:8.4.0

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir /app
WORKDIR /app

RUN npm install -g nodemon

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3001

CMD npm start
