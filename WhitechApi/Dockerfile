FROM node:7.8.0

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY . .

# Run our app.
CMD ["node", "server.js"]  