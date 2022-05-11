FROM node:16.14.2-alpine3.15 as builder

RUN npm install -g pnpm

WORKDIR /usr/app

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:16.14.2-alpine3.15

RUN apk update \
    && apk --no-cache --update add bash imagemagick

RUN npm install -g pnpm

ENV NODE_ENV=production

WORKDIR /usr/app

COPY --from=builder /usr/app/dist /usr/app/dist
COPY --from=builder /usr/app/node_modules /usr/app/node_modules
COPY package.json /usr/app/package.json

# Migrations
COPY tsconfig.json .
COPY package.json .
COPY src src

EXPOSE 3000
CMD ["node", "dist/main"]