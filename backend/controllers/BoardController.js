import BoardService from "../services/BoardService.js";
import {logger} from "../logger.js";

class BoardController {
    async getAllBoards(req, res) {
        try {
            const boards = await BoardService.getAllBoards()

            return res.status(200).json(boards);
        } catch (e) {
            logger.error('BoardController.getAllBoards' + e)

            return res.status(500).json({error: e.message});
        }
    }
    async getBoardById(req, res) {
        try {
            if(!req.params.id) {
                res.status(500).json({error: 'Params id must be provided'})
            }

            const id = req.params.id;
            const board = await BoardService.getBoardById(id)
            if (board === null) {
                return res.status(404).json('Board not found with id: '+ id);
            }
            return res.status(200).json(board)
        } catch (e) {
            logger.error('BoardController: ' + e.message)
            return res.status(500).json({error: e.message});
        }
    }
    async updateBoardById(req, res) {
        logger.info('BoardController.updateBoardById')
        try {
            if(!req.params.id) {
                res.status(500).json({error: 'Params id must be provided'})
            }

            const id =req.params.id;
            const {name} = req.body;

            const result = await BoardService.updateBoardById(id, name);
            logger.info('BoardController.updateBoardById.result= '+ result)
            if (result == 0) {
                return res.status(404).json('Board with id: '+ id + ' not found')
            } else if (result == 1) {
                return res.status(200).json('The board was updated with id: '+ id)
            }
        } catch (e) {
            logger.error('BoardController.updateBoardById: ', e);
        }
    }
    async deleteBoardById(req, res) {
        logger.info('BoardController.deleteBoardById');
        try {
            if (!req.params.id) {
                return res.status(500).json({error: 'Params id must be provided'})
            }

            const id = req.params.id;
            const result = await BoardService.deleteBoard(id)
            if (result == 0) {
                return res.status(404).json('Board with id: '+ id + ' not found')
            } else if (result == 1) {
                return res.status(200).json('The board was deleted with id: '+ id)
            }
        } catch (e) {
            logger.error('BoardService.deleteBoardById', e);
            res.status(500).json({error: e.message})
        }
    }
    async createBoard(req, res) {
        logger.info("BoardController.createBoard");
        try {
            const { name } = req.body;

            const board = await BoardService.createBoard(name);
            logger.info('BoardController.createBoard' + JSON.stringify(board));

            return res.status(201).json(board);

        } catch (e) {
            logger.error("createBoard", e);

            res.status(500).json({error: e.message});
        }
    }
}

export default new BoardController();