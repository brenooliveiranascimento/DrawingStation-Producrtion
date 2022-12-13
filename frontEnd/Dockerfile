FROM node:16.14-alpine

WORKDIR /app/drawingstation-frontend

EXPOSE 3001

COPY . .

RUN npm install

ENTRYPOINT [ "npm", "rum", "dev" ]