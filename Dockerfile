FROM node:14-alpine

WORKDIR /src

ADD package**.json /src/

RUN npm install --silent

ADD . /src

CMD ["npm","start"]