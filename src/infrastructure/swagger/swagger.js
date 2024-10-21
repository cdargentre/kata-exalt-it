const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kata Node API',
      version: '1.0.0',
      description: "Documentation de l'API pour le projet Kata Node",
      contact: {
        name: "Charles d'Argentré",
        // url: 'https://votre-website.com',
        email: 'cdargentre@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',  // Indiquer qu'il s'agit de JWT
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Appliquer le schéma d'authentification par défaut à toutes les routes
      },
    ],
  },
  apis: [path.join(__dirname, './*.js')],
};
const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
}

module.exports = swaggerDocs;

