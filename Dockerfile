FROM node:16.15.0@sha256:59eb4e9d6a344ae1161e7d6d8af831cb50713cc631889a5a8c2d438d6ec6aa0f as react-build

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app
RUN npm ci
RUN npm run build

FROM nginx:1.29-alpine@sha256:5616878291a2eed594aee8db4dade5878cf7edcb475e59193904b198d9b830de

COPY --from=react-build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

COPY --from=react-build /usr/src/app/build /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]