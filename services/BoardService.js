import {Board} from '../models/board.js';
import {logger} from '../logger.js';

class BoardService {
    async getAllBoards() {
        logger.info('BoardService.getAllBoards');
        const boards = await Board.findAll()
        logger.info('BoardService.getAllBoards'+ JSON.stringify(boards));

        return boards
    }
    async getBoardById(id) {
        logger.info('BoardService.getBoardById: '+ id);
        try {
            const board = await Board.findOne({
                where: {id: id},
            })
            logger.info('BoardService.getBoardById: ' + JSON.stringify(board))
            return board
        } catch(e) {
            logger.error('BoardService.getBoardById: '+ e )
        }
    }
    async updateBoardById(id, name) {
        logger.info('BoardService.updateBoardById name= '+ name)
        try {
            const result = await Board.update(
                {name},
                {where: {id: id}}
            );
            return result;
        } catch (e) {
            logger.error('BoardService.updateBoardById' + JSON.stringify(e));
        }
    }
    async deleteBoard(id) {
        logger.info('BoardService.deleteBoard with id: ' + id);
        try {
            const result = await Board.destroy({
                where: { id: id, }
            })
            logger.info('BoardService.deleteBoard.result: '+ result)
            return result;
        } catch (e) {
            logger.error('BoardService.deleteBoard.Error: ', e)
        }
    }
    async createBoard(name) {
        logger.info('BoardService.createBoard' + name);
        const board = await Board.create({name});

        if (!board) {
            throw new Error("Board not created!")
        }
        return board;
    }
}


export default new BoardService();