# Set the base image to latest node (for now)
FROM      node:latest

# Install nodemon
RUN       npm install -g nodemon

# Provides cached layer for node_modules
COPY      package.json /src/package.json
RUN       cd /src/ \
          && npm install

# Define working directory
WORKDIR   /src
ADD       . /src

# Expose port
EXPOSE    8080

# Run app using nodemon
CMD       [ "npm", "start" ]