import TaskService from "../services/TaskService.js";
import {logger} from "../logger.js";

class TaskController {
    async getAllTasksByBoardId(req, res) {
        logger.info('TaskController.getAllTasksByBoardId');
        try {
            const {board_id, column, direction} = req.body;
            const result = await TaskService.getAllTasksByBoardId(board_id, column, direction);
            res.status(200).json(result);
        } catch (e) {
            logger.error('TaskController.getAllTasksByBoardId', e);
            res.status(500).json({error: e.message});
        }
    }

    async getOneTaskById(req, res) {
        logger.info('TaskController.getOneTaskById')
        try {
            if(!req.params.id) {
                res.status(500).json({error: 'Params id must be provided'})
            }
            const task_id = req.params.id;
            const task = await TaskService.getOneTasksById(task_id)
            res.status(200).json(task);
        } catch (e) {
            logger.error('TaskController.getOneTaskById', e);
            res.status(500).json({error: e.message});
        }
    }
    async updateTaskById(req, res) {
        try {
            if(!req.params.id) {
                res.status(500).json({error: 'Params id must be provided'})
            }
            const task_id = req.params.id;
            const {done, content, board_id} = req.body;
            const task = await TaskService.updateTaskById(task_id, done, content, board_id)
            res.status(200).json('Success' + JSON.stringify(task));
        } catch (e) {
            logger.error('TaskController.updateTaskById', e);
            res.status(500).json({error: e.message});
        }
    }
    async createTaskByBoardId(req, res) {
        logger.info('TaskController.createTaskByBoardId');
        try {
            const {board_id, content} = req.body;
            const result = await TaskService.createTaskByBoardId(board_id, content)
            res.status(200).json('Success: ' + JSON.stringify(result))
        } catch (e) {
            logger.error('TaskController.createTaskByBoardId', e);
            res.status(500).json({error: e.message});
        }
    }

    async deleteTaskById(req, res) {
        try {
            if(!req.params.id) {
                res.status(500).json({error: 'Params id must be provided'})
            }
            const task_id = req.params.id;
            await TaskService.deleteTaskById(task_id)
            res.status(200).json('Successfullly deleted task with id: '+ task_id)
        } catch (e) {
            logger.error('TaskController.deleteTaskById', e);
            res.status(500).json({error: e.message});
        }
    }
}

export default new TaskController();