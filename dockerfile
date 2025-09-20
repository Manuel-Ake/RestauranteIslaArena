FROM node:20
WORKDIR /app

# Copia desde la subcarpeta Isla
COPY ./Isla/package*.json ./

RUN npm install -g @angular/cli && npm install

# Copia TODO el código de la subcarpeta Isla
COPY ./Isla/ .

RUN npm run build
RUN npm install -g http-server
EXPOSE 8080
CMD ["http-server", "dist/Isla/browser", "-p", "8080"]