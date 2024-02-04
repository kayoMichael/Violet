FROM node:18-alpine AS deps
WORKDIR /base

COPY package.json package-lock.json ./
RUN  npm install --production

FROM node:18-alpine AS builder
WORKDIR /build
COPY --from=deps /base/node_modules ./node_modules

COPY ./app /build/app
COPY package.json package-lock.json ./

COPY tsconfig.json .
COPY next.config.mjs .

RUN npm run build

FROM node:18-alpine AS runner
#
WORKDIR /app

COPY --from=builder /build/.next ./.next
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./package.json

CMD ["npm", "start"]