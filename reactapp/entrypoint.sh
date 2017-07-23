#!/bin/sh

sed -i "s,\$API_HOST,${API_HOST},g" /src/dist/assets/bundle.js

# Depending on the environment we'll start either PM2 for production
# or nodemon for development.
if [ "$PRODUCTION" = true ]; then
	npm run start:production
else
	npm start
fi
