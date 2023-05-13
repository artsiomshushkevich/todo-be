# build stage
FROM node:16-slim AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --only=production

# main stage
FROM gcr.io/distroless/nodejs16-debian11 AS main

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules/ /usr/src/app/node_modules/ 
COPY --from=build /usr/src/app/dist/ /usr/src/app/

EXPOSE 3000

CMD ["main.js"]