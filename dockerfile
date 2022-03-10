FROM node:17.6.0

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

RUN apt update

RUN apt install vim -y

COPY . .

EXPOSE 8181

CMD ["npm", "start"]
