import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { authDocs } from '../../docs/auth.docs';
import { chatDocs } from '../../docs/chat.docs';
import { adminDocs } from '../../docs/admin.docs';

// Define Swagger options
const swaggerOptions: swaggerJsDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Chat-App API Documentation',
            version: '1.0.0',
            description: 'API documentation for your Node.js & TypeScript app',
        },
        paths: {
            ...authDocs,
            ...adminDocs,
            ...chatDocs,
        },
        servers: [
            {
                url: 'http://localhost:4000/api/v1',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./app/routes/*.ts'], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    // console.log('Swagger Docs available at http://localhost:4000/api-docs');
};
