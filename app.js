require('dotenv').config();
const mongoose=require('mongoose')
const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

const apiRouter = require('./routes')
app.use(cors());
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0', // Version OpenAPI
      info: {
        title: 'API de Gestion de CV',
        version: '1.0.0',
        description: 'Documentation de l\'API de gestion des CVs',
      },
      servers: [
        {
          url: 'http://localhost:3000', 
        },
      ],
    },
    apis: ['./routes/*.js'], // Fichiers où Swagger analysera les définitions
  };
  
  // Initialisation de swagger-jsdoc
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  
  // Activer Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/', apiRouter);

app.listen(3000, () => {
    console.log('server is running');

    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log('Database connected');
        })
        .catch((error) => {
            console.log("Error when trying to connect to the database:", error);
        });
})
module.exports = app;