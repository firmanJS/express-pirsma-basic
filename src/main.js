const express = require('express')
const { PORT } = require('./config')

const app = express()
const bookService = require('./book.service')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

app.use(express.json({})); // json body reqeust
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book API',
      version: '1.0.0',
      description: 'A simple CRUD API for books using Express.js, Prisma, and PostgreSQL',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/book.service.js'], // Path to the API docs
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
// Swagger UI Route
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bookService)

app.listen(PORT, () => {
  console.log('yeay app running in port', PORT)
})