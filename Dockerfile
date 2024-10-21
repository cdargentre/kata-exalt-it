# Utiliser l'image de Node.js officielle comme image de base
FROM node:16

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier le package.json et le package-lock.json (s'il existe)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application écoutera
EXPOSE 3000

# Commande à exécuter lorsque le conteneur démarre
CMD ["npm", "start"]
