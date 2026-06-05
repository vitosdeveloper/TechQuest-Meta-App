# Build Stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY lessons ./lessons
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Assets estáticos (as lições .md no caso do course-service precisam ser copiadas caso estejam na raiz)
# Para garantir, copiamos todo o workspace onde as lições estão.
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/lessons ./lessons

EXPOSE 3002

CMD ["npm", "run", "start"]
