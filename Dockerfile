FROM node:alpine3.18
WORKDIR /server
COPY package.json ./
COPY . .
EXPOSE 5050
CMD [ "npm","run", "start" ]