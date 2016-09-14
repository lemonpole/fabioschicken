# Set the base image to latest node (for now)
FROM      node:6

# Provides cached layer for node_modules
COPY      package.json /src/package.json
RUN       cd /src/ && npm install

# Define working directory
WORKDIR   /src
ADD       . /src

# Run app using nodemon
CMD       [ "npm", "production" ]