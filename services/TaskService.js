import {Task} from '../models/task.js';
import {Board} from '../models/board.js'
import {logger} from '../logger.js';

class TaskService {
    async getAllTasksByBoardId(board_id) {
        logger.info('TaskService.getAllTasksByBoardId: '+ board_id);
        try {
            const board = await Board.findOne(
                { where: {id: board_id}}
            )
            const result = await board.getTasks()
            return result
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
    async updateTaskById(task_id, done, content) {
        logger.info('TaskService.updateTaskById: '+ task_id);
        try {
            await Task.update(
                {done: done, content: content},
                { where: {id: task_id},}
            );
            const task = await Task.findOne(
                {where: {id: task_id}})

            return task

        } catch (e) {
            logger.error('TaskService.updateTaskById', e);
        }

    }
    async createTaskByBoardId(board_id, content) {
        logger.info('TaskService.createTaskByBoardId: '+ board_id);
        try {
            const board = await Board.findOne(
                {where: {id: board_id}},
            )
            const task = await Task.create({
                content: content
            })
            await board.addTasks(task)
            const result = await board.getTasks()
            return result

        } catch (e) {
            logger.error('TasKService.createTaskByBoardId: ', e)
        }

    }
    async deleteTaskById(task_id) {
        logger.info('TaskService.deleteTask with id: ' + task_id);
        try {
            await Task.destroy({
                where: { id: task_id, }
            })
        } catch (e) {
            logger.error('Can`t delete task', e)
        }

    }
}


export default new TaskService();