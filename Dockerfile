# phase used for developing and further build phases
FROM node:16 AS build-phase-1

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

# phase for building bundle which will be used on env
FROM node:16 AS build-phase-2

WORKDIR /app

COPY --from=build-phase-1 /app/ /app/

RUN npm prune --omit=dev

# running the app on lightweight node image
FROM gcr.io/distroless/nodejs16-debian11 AS main

WORKDIR /app

COPY --from=build-phase-2 /app/node_modules/ /app/node_modules/ 
COPY --from=build-phase-2 /app/dist/ /app/dist/

EXPOSE 3000

CMD ["dist/main.js"]