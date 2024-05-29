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

            return res.status(200).json(board)
        } catch (e) {
            logger.error('BoardController' + e)

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

            await BoardService.updateBoardById(id, name);
            logger.info('BoardController.updateBoardById')
            return res.status(200).json('Success')
        } catch (e) {
            logger.error('BoardController.updateBoardById', e);
        }
    }
    async deleteBoardById(req, res) {
        logger.info('BoardController.deleteBoardById');
        try {
            if (!req.params.id) {
                res.status(500).json({error: 'Params id must be provided'})
            }

            const id = req.params.id;
            await BoardService.deleteBoard(id)
            logger.info('BoardService.deleteBoardById with id: ', id);
            res.status(200).json('Success')
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