FROM node:16.14.2-alpine3.15 as builder

RUN npm install -g pnpm

WORKDIR /usr/app

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build
RUN pnpm prune --prod

FROM node:16.14.2-alpine3.15

RUN apk add --update imagemagick

ENV NODE_ENV=production

WORKDIR /usr/app

COPY --from=builder /usr/app/dist /usr/app/dist
COPY --from=builder /usr/app/node_modules /usr/app/node_modules

EXPOSE 3000
ENTRYPOINT [ "node" ]
CMD [ "dist/main.js" ]