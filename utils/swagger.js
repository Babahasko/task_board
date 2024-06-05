import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            description:
                'This is a simple CRUD API application made with Express and documented with Swagger',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./router.js', './models/board.js', './models/task.js'],
};

const spec = swaggerJsdoc(options);

export {
    spec,
    swaggerUi
}