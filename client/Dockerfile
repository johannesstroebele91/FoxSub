FROM node AS build_base
WORKDIR client
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build_base client/default.conf	/etc/nginx/conf.d
COPY --from=build_base client/dist/ /usr/share/nginx/html
