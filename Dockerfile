FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8043

RUN npm run build

FROM pierrezemb/gostatic AS production

COPY --from=builder /usr/src/app/dist/ /srv/http/

