FROM node:16-alpine

WORKDIR /app

COPY . .

RUN yarn

RUN npx tsc

CMD ["node", "bin/www"]