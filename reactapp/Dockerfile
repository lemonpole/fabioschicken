# Set the base image for node
FROM mhart/alpine-node:6

# Install any extra dependencies we may need since we're using a
# a very bare-bones node install
RUN apk add --no-cache make g++ python git

# Add the source files and compile the application along with node-sass:
# https://github.com/sass/node-sass/issues/1527#issuecomment-217070514
WORKDIR /src/
COPY . /src/
RUN cd /src/ && npm rebuild node-sass && npm install

# Run the application!
CMD [ "npm", "run", "production" ]
