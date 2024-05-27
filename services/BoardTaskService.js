import sequelize from '../db.js';
import {Board, Task} from '../models/board.js';
import {logger} from '../logger.js';

class BoardTaskService {
    async createBoard(name) {
        logger.info('BoardTaskService.createBoard', name);
        const board = await Board.create({name});

        if (!board) {
            throw new Error("Board not created!")
        }
        logger.info("BoardTaskService.createBoard", board);
        return board
    }
}

export default new BoardTaskService();