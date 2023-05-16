#syntax=docker/dockerfile:1.2

# ---- Base Node ----
FROM node:18-alpine3.17 AS base

# set working directory
WORKDIR /app

# copy project files
COPY ./package.json .
COPY ./package-lock.json .

# ---- Dev Dependencies ----
FROM base AS dependencies
RUN apk add --update python3 make g++\ && rm -rf /var/cache/apk/*
RUN CYPRESS_INSTALL_BINARY=0 \
    npm ci --no-audit --no-progress --force

# ---- Release ----
FROM dependencies AS release

EXPOSE 3000

COPY . .
RUN ln -s /app/apps/prisma/schema.prisma /schema.prisma
RUN npm run generate

CMD ["sh", "./tools/start-api.sh"]
