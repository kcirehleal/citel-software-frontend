# Etapa de construção
FROM node:16.17-alpine AS BUILD
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de produção
FROM nginx:1.21.6-alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=BUILD /app/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]