# imagen base de Node.js
FROM node:18-alpine

# carpeta de trabajo dentro del contenedor
WORKDIR /app

# copiar los archivos de dependencias
COPY package*.json ./

# instalar dependencias
RUN npm install

# copiar el resto del proyecto
COPY . .

# puerto que expone el contenedor
EXPOSE 3000

# comando para iniciar el servidor
CMD ["npm", "start"]