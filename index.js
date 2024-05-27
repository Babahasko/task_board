import express from 'express';
import {logger} from './logger.js';
import sequelize from './db.js'
import {Board, Task} from './models/board.js';
import router from './router.js';


const PORT = 5000;

const app = express();

// Middleware
app.use(express.json());
app.use('/api', router)
//

try{
    await sequelize.authenticate();
    logger.info('Connection to the database Sucessfull')
} catch (e) {
    logger.error('Unable to connect to the database', e)
}

try{
    await Board.sync();
    await Task.sync();
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
