FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/classrooms /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
