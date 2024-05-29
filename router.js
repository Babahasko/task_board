import express from "express";
import BoardController from "./controllers/BoardController.js";
import TaskController from "./controllers/TaskController.js";
const router = express();

//BoardRouter
router.post('/board', BoardController.createBoard)
router.get('/board/:id', BoardController.getBoardById)
router.get('/board', BoardController.getAllBoards)
router.put('/board/:id', BoardController.updateBoardById)
router.delete('/board/:id', BoardController.deleteBoardById)
//

//TaskRouter
router.post('/task', TaskController.createTaskByBoardId)
router.get('/task', TaskController.getAllTasksByBoardId)
router.get('/task/:id', TaskController.getOneTaskById)
router.put('/task/:id', TaskController.updateTaskById)
router.delete('/task/:id', TaskController.deleteTaskById)
//

export default router;