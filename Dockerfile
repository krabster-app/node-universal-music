FROM node:18-alpine3.17 as build

WORKDIR /app

COPY package*.json ./
COPY client-old/package*.json ./client/
COPY shared/package*.json ./shared/
COPY server/package*.json ./server/
ENV NODE_ENV=development
RUN npm ci
COPY . .
RUN npm run -w @sovok/server generate
RUN npm run build

FROM node:18-alpine3.17 as runtime

LABEL org.opencontainers.image.source="https://github.com/talkiiing-team/sovok"

RUN adduser -D app
WORKDIR /home/app
USER app

COPY --from=build --chown=app /app/node_modules ./node_modules/
COPY --from=build --chown=app /app/dist ./dist/
COPY --from=build --chown=app /app/server/package.json ./server/
COPY --from=build --chown=app /app/server/prisma/ ./server/prisma/
COPY --from=build --chown=app /app/package.json .

CMD ["npm", "start"]
