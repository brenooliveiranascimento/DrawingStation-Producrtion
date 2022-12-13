FROM node:16.14-alpine

WORKDIR /app/drawingstation-backend

EXPOSE 3001

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]