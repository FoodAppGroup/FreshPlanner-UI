FROM node:16.14-alpine as builder
MAINTAINER Felix Steinke <steinke.felix@yahoo.de>

WORKDIR /app
COPY ./ .

RUN npm install
RUN npm run build --prod

FROM nginx:1.21-alpine as runner
MAINTAINER Felix Steinke <steinke.felix@yahoo.com>

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/fresh-planner-ui /usr/share/nginx/html

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

EXPOSE 4200
