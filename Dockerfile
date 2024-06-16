FROM node:16.15.0 as react-build

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app
RUN npm ci
RUN npm run build

FROM nginx:alpine

COPY --from=react-build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

COPY --from=react-build /usr/src/app/build /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]