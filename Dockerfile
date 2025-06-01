FROM node:18 as build
WORKDIR /etc/vipfs-protocol
ENV PATH /etc/vipfs-protocol/node_modules/.bin:$PATH
COPY package*.json ./
COPY . .
RUN cd /etc/vipfs-protocol
RUN npm i
RUN npm run build
# production environment
FROM nginx:stable-alpine
COPY --from=build /etc/vipfs-protocol/dist /usr/share/nginx/html
# Add your nginx.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
EXPOSE 9538
CMD ["nginx", "-g", "daemon off;"]