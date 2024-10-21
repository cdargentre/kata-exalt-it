const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./infrastructure/db/db');
const connectAndInitialize = require('./infrastructure/db/dbInitializer'); 
const routes = require('./infrastructure/routes'); 
const setupSwagger = require('./infrastructure/swagger/swagger'); 
const dbMiddleware = require('./infrastructure/middleware/db-middleware');
require('dotenv').config(); 

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Middleware pour la base de données
app.use(dbMiddleware); 

// Routes
app.use('/api', routes);

// Configuration de Swagger
setupSwagger(app); // Initialiser Swagger

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Fonction pour démarrer le serveur
const startServer = async () => {
  try {
    console.log('Trying to connect to the database...'); // Log avant la connexion

    await connectDB(); // Attendre la connexion à la DB
    await connectAndInitialize(); // Initialiser la DB avec les données
    console.log('Database initialized successfully');

    // Démarrage du serveur
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    return server; // Retourner l'instance du serveur pour pouvoir l'arrêter dans les tests
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

// Démarrer le serveur uniquement si ce fichier est exécuté directement
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer }; // Exporter l'application et la fonction de démarrage
