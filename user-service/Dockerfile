# Build Stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app
RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps
RUN npx prisma generate

COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine

WORKDIR /usr/src/app
RUN apk add --no-cache openssl

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/proto ./proto

# Expose the default port
EXPOSE 3000

# Start command
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && node dist/index.js"]
