import {Task} from '../models/task.js';
import {Board} from '../models/board.js'
import {logger} from '../logger.js';

class TaskService {
    async getAllTasks(board_id, column='createdAt', direction='DESC') {
        logger.info('TaskService.getAllTasks: '+ board_id);
        try {
            if (board_id) {
                const board = await Board.findOne(
                    { where: {id: board_id}}
                )
                const result = await board.getTasks({
                    order: [
                        [column, direction],
                    ]
                })
                return result;
            } else {
                const result = await Task.findAll({
                    order: [
                        [column, direction],
                    ]
                    }
                )
                return result;
            }
        } catch (e) {
            logger.error('TaskService.getAllTasksByBoardId', e)
        }
    }
    async getOneTasksById(task_id) {
        logger.info('TaskService.getOneTasksById: '+ task_id);
        try {
            const task = await Task.findOne(
                { where : {id: task_id}}
            );
            return task
        } catch (e) {
            logger.error('TaskService.getOneTaskById', e)
        }

    }
    async updateTaskById(task_id, done, content, board_id) {
        logger.info('TaskService.updateTaskById: '+ task_id);
        try {
            const result = await Task.update(
                {done: done, content: content, BoardId: board_id},
                { where: {id: task_id},}
            );
            return result;
        } catch (e) {
            logger.error('TaskService.updateTaskById', e);
        }
    }
    async createTaskByBoardId(board_id, content) {
        logger.info('TaskService.createTaskByBoardId: '+ board_id);
        try {
            const board = await Board.findOne(
                {where: {id: board_id}},
            );
            logger.info('TaskService.createTaskByBoardId.board: '+ board)
            if (board == null) {
                const task = null
                return {board: board, task: task};
            } else {
                const task = await Task.create({
                    content: content
                });
                await board.addTasks(task);
                const tasks = await board.getTasks({
                        where: {BoardId: board_id},
                        order: [['createdAt', 'DESC']],
                    });
                const created_task = tasks[0];
                return {board: board, task: created_task};
            }
        } catch (e) {
            logger.error('TasKService.createTaskByBoardId: ', e.message)
        }

    }
    async deleteTaskById(task_id) {
        logger.info('TaskService.deleteTask with id: ' + task_id);
        try {
            const result = await Task.destroy({
                where: { id: task_id, }
            })
            return result;
        } catch (e) {
            logger.error('Can`t delete task', e)
        }

    }
}


export default new TaskService();