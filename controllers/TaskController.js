import TaskService from "../services/TaskService.js";
import {logger} from "../logger.js";

class TaskController {
    async getAllTasks(req, res) {
        logger.info('TaskController.getAllTasksByBoardId');
        try {
            const {board_id, column, direction} = req.query;
            const result = await TaskService.getAllTasks(board_id, column, direction);
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
            if (task === null) {
                return res.status(404).json('Task not found with id: '+ task_id);
            }
            return res.status(200).json(task);
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
            const result = await TaskService.updateTaskById(task_id, done, content, board_id)
            if (result == 0) {
                return res.status(404).json('Task with id: '+ task_id + ' not found')
            } else if (result == 1) {
                return res.status(200).json('The task was updated with id: '+ task_id)
            }
        } catch (e) {
            logger.error('TaskController.updateTaskById', e);
            res.status(500).json({error: e.message});
        }
    }
    async createTaskByBoardId(req, res) {
        logger.info('TaskController.createTaskByBoardId');
        try {
            const {board_id, content} = req.body;
            const {board, task} = await TaskService.createTaskByBoardId(board_id, content)
            logger.info('TaskController.createTaskByBoardId'+ ' board: '+ board + ' task: '+ task)
            if (board === null) {
                return res.status(404).json('Board with id: '+ board_id + ' not found')
            } else {
                return res.status(201).json(task)
            }
        } catch (e) {
            logger.error('TaskController.createTaskByBoardId', e);
            return res.status(500).json({error: e.message});
        }
    }
    async deleteTaskById(req, res) {
        try {
            if(!req.params.id) {
                res.status(500).json({error: 'Params id must be provided'})
            }
            const task_id = req.params.id;
            const result = await TaskService.deleteTaskById(task_id)
            if (result == 0) {
                return res.status(404).json('Task with id: '+ task_id + ' not found')
            } else if (result == 1) {
                return res.status(200).json('The task was deleted with id: '+ task_id)
            }
        } catch (e) {
            logger.error('TaskController.deleteTaskById', e);
            res.status(500).json({error: e.message});
        }
    }
}

export default new TaskController();