import BoardTaskService from "../services/BoardTaskService.js";
import {logger} from "../logger.js";

class BoardTaskController {
    async createBoard(req, res) {
        logger.info("BoardTaskController.createBoard");
        try {
            const { name } = req.body;
            console.log(req.body)

            const board = await BoardTaskService.createBoard(name);
            logger.info('BoardTaskController.createBoard' + JSON.stringify(board));

            return res.status(200).json(board);

        } catch (e) {
            logger.error("createBoard", e);

            res.status(500).json({error: e.message});
        }
    }
}

export default new BoardTaskController();