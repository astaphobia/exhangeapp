FROM node:8.11.2

ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /usr/code/exhangeapp
COPY . /usr/code/exhangeapp

RUN yarn install
RUN yarn build
CMD [ "node", "server.js"]
EXPOSE 3000