FROM node:7.10.0

COPY . /src/
WORKDIR /src/

RUN mv /src/entrypoint.sh /usr/local/bin/fabioschicken \
    && npm install \
    && npm run production

CMD [ "/usr/local/bin/fabioschicken" ]
