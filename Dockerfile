FROM node:8.11.2-alpine as node
WORKDIR /usr/src/app
RUN npm i -g @angular/cli
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 4200

CMD npm run start
