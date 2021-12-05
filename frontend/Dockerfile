FROM node:14-alpine as build-deps

RUN apk update

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY .env ./
COPY index.html ./index.html
COPY vite.config.ts ./vite.config.ts
COPY src ./src

RUN npm install
RUN npm run build
CMD ["npm", "run", "serve", "--",  "--host"]