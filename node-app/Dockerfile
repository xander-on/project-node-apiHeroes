FROM node:18

WORKDIR /node-app
COPY package.json .
RUN npm install

COPY . .
CMD npm run dev
