FROM nginx:1.13.1-alpine

COPY nginx.conf proxy-common.conf /etc/nginx/

# alpine image does not come with openssl
# RUN apk --no-cache add openssl

CMD [ "nginx", "-g", "daemon off;" ]
