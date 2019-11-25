FROM node:8-alpine AS build_baser
WORKDIR client
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build_baser client/default.conf	/etc/nginx/conf.d
COPY --from=build_baser client/dist/ /usr/share/nginx/html
