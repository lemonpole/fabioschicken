FROM node:7.10.0-alpine

RUN apk add --no-cache make g++ python git

COPY . /src/
WORKDIR /src/

RUN mv /src/entrypoint.sh /usr/local/bin/fabioschicken \
    && npm rebuild node-sass \
    && npm install \
    && npm run production

CMD [ "/usr/local/bin/fabioschicken" ]
