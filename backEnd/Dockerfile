FROM node:16
WORKDIR /app/drawingstationbeta-back
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . . 
CMD [ "npm", "run", "dev" ]