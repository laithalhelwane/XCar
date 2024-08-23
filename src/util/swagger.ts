import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { SwaggerTheme } from 'swagger-themes';
import logger from './logger';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Graduation Project',
      description:
        'This document demonstrates the server APIs and how to send/receive data from them.',
      version: '1.0.0',
      contact: {
        name: 'Laith Al-Helwany',
        email: 'laith.helwany@gmail.com',
        url: 'https://www.fb.com/laithhelwany',
        'x-phone': '00963934189422',
      },
    },
    servers: [
      {
        url: 'https://grad-proj-car.onrender.com',
        description: 'Online Production Server',
      },
      {
        url: 'https://localhost:3000',
        description: 'For local development',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: 'User', description: 'User Related Endpoints' },
      { name: 'Session', description: 'Session Related Endpoints' },
      { name: 'Car', description: 'Car Related Endpoints' },
      { name: 'Brand', description: 'Brand Related Endpoints' },

    ],
    schemes: ['https'],
  },
  apis: [
    './src/components/users/*.ts',
    './src/components/sessions/*.ts',
    './src/components/cars/*.ts',
    './src/components/brand/*.ts',
    './src/components/appointments/*.ts',
  ],
};
// const theme = new SwaggerTheme('v3');

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number | string) {
  // swagger page
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      // customCss: theme.getBuffer('dark'),
    })
  );

  //docs in json fromat
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  logger.info(`Docs available at http://localhost:${port}/docs`);
}
export default swaggerDocs;
