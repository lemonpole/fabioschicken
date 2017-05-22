FROM      larsson719/alpine-node-sass:latest
WORKDIR   /src/
COPY      . /src/
COPY      entrypoint.sh /root/entrypoint.sh
RUN       npm install && npm run production
CMD       ["/root/entrypoint.sh"]
