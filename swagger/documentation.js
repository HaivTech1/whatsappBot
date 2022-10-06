const userRouteDoc = require('./user.doc');
const whatsappRouteDoc = require('./whatsapp.doc');
const swaggerOptions = {
  openapi: '3.0.0',
  info: {
    title: 'API Whatsapp-Web.js',
    version: '0.0.1',
    description: 'API Whatsapp-Web.js',
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Development server',
    },
    {
      url: 'https://staging.gigantic-server.com/v1',
      description: 'Staging server',
    },
    {
      url: 'https://api.gigantic-server.com/v1',
      description: 'Production server',
    },
  ],
  tags: [
    {
      name: 'Whatsapp',
      description: 'Whatsapp Route',
    },
  ],
  paths: {
    ...whatsappRouteDoc,
  },
};
module.exports = swaggerOptions;
