import {Board} from '../models/board.js';
import {logger} from '../logger.js';

class BoardService {
    async getAllBoards() {
        logger.info('BoardService.getAllBoards');
        const boards = await Board.findAll()
        logger.info('BoardTaskService.getAllBoards'+ JSON.stringify(boards));

        return boards
    }
    async getBoardById(id) {
        logger.info('BoardService.getBoardById: '+ id);
        const board = await Board.findOne({
            where: {id: id},
        })
        logger.info('Board: ' + JSON.stringify(board))
        return board
    }

    async updateBoardById(id, name) {
        logger.info('BoardService.updateBoardById name= '+ name)
        try {
            await Board.update(
                {name},
                {where: {id: id}}
            );
        } catch (e) {
            logger.error('BoardService.updateBoardById' + JSON.stringify(e));
        }
    }
    async deleteBoard(id) {
        logger.info('BoardService.deleteBoard with id: ' + id);
        try {
            await Board.destroy({
                where: { id: id, }
            })
        } catch (e) {
            logger.error('Can`t delete board', e)
        }
    }
    async createBoard(name) {
        logger.info('BoardService.createBoard' + name);
        const board = await Board.create({name});

        if (!board) {
            throw new Error("Board not created!")
        }
        return board
    }
}


export default new BoardService();