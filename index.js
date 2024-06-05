import express from 'express';
import {logger} from './logger.js';
import sequelize from './db.js'
import {Board} from './models/board.js';
import {Task} from './models/task.js';
import router from './router.js';
import {swaggerUi, spec} from './utils/swagger.js';

const PORT = 5000;

const app = express();

// Middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec, {explorer: true}));
app.use(express.json());
app.use('/api', router)
//

try{
    await sequelize.authenticate();
    logger.info('Connection to the database Successful')
} catch (e) {
    logger.error('Unable to connect to the database', e)
}

try{
    await sequelize.sync({alter: true})
    logger.info('Tables sync successfully')
} catch (e) {
    logger.error('Unable to sync databases', e)
}

try {
    app.listen(PORT, () => {
        logger.info(`Server listening on port ${PORT}`)
    });
} catch (e){
    logger.error(e);
}
