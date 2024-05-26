import express from 'express';
import {logger} from './logger.js';


const PORT = 5000;

const app = express();

// Middleware
app.use(express.json());
//


try {
    app.listen(PORT, () => {
        logger.info(`Server listening on port ${PORT}`)
    });
} catch (e){
    logger.error(e);
}
