# Frontend Dockerfile for Vite + React
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# Enable access from outside container
CMD ["npm", "run", "dev", "--", "--host"]
