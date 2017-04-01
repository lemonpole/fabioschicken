# Set the base image for node
FROM mhart/alpine-node:6

# Install any extra dependencies we may need since we're using a
# a very bare-bones node install
# RUN apk add --no-cache make g++ python git

# Add the source files and compile the application
WORKDIR /src/
COPY . /src/
RUN cd /src/ && npm install

# Run the application!
CMD [ "npm", "run", "production" ]
