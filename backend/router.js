import express from "express";
import BoardController from "./controllers/BoardController.js";
import TaskController from "./controllers/TaskController.js";
const router = express();

//BoardRouter
/**
 * @swagger
 * tags:
 *   name: Board
 *   description: The board managing API
 * /api/board:
 *   post:
 *     summary: Create a new board
 *     tags: [Board]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              name:
 *               type: string
 *     responses:
 *       201:
 *         description: The created board.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       500:
 *         description: Some server error
 *
 */
router.post('/board', BoardController.createBoard)
/**
 * @swagger
 * /api/board/{id}:
 *   get:
 *     summary: Get the board by ID
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The board ID
 *     responses:
 *       200:
 *         description: The board response by ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       500:
 *         description: Some server error
 *       404:
 *         description: The board not found by ID.
 *
 */
router.get('/board/:id', BoardController.getBoardById)
/**
 * @swagger
 * /api/board:
 *   get:
 *     summary: Lists all the board`s
 *     tags: [Board]
 *     responses:
 *       200:
 *         description: The list of all boards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Board'
 *       500:
 *         description: Some server error
 *
 */
router.get('/board', BoardController.getAllBoards)
/**
 * @swagger
 * /api/board/{id}:
 *   put:
 *     summary: Update the board by ID
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The board ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The board was updated
 *       400:
 *         description: The board not found by ID
 *       500:
 *         description: Some server error
 *
 */
router.put('/board/:id', BoardController.updateBoardById)
/**
 * @swagger
 * /api/board/{id}:
 *   delete:
 *     summary: Delete the board by ID
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The board ID
 *     responses:
 *       200:
 *         description: The board was deleted
 *       500:
 *         description: Some server error
 *       404:
 *         description: The board not found by ID.
 *
 */
router.delete('/board/:id', BoardController.deleteBoardById)
//

//TaskRouter
/**
 * @swagger
 * tags:
 *   name: Task
 *   description: The task managing API
 * /api/task:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              content:
 *               type: string
 *              board_id:
 *               type: integer
 *               description: Foreign key to bard ID
 *     responses:
 *       200:
 *         description: The created task.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: The board not found by ID
 *       500:
 *         description: Some server error
 *
 */
router.post('/task', TaskController.createTaskByBoardId)
/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Lists all the task`s
 *     tags: [Task]
 *     parameters:
 *       - in: query
 *         name: board_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID of the board to get
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *         required: false
 *         description: Column for filtering. Such as 'updatedAt'. Default = createdAt
 *       - in: query
 *         name: direction
 *         schema:
 *           type: string
 *         required: false
 *         description: Direction of the filtering column. Default is DESC
 *     responses:
 *       200:
 *         description: The list of all board tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Some server error
 *
 */
router.get('/task', TaskController.getAllTasks)
/**
 * @swagger
 * /api/task/{id}:
 *   get:
 *     summary: Get the task by ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: Get the task by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Some server error
 *       404:
 *         description: The task not found by ID
 *
 */
router.get('/task/:id', TaskController.getOneTaskById)
/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *     summary: Update the task by ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               done:
 *                 type: boolean
 *               content:
 *                 type: string
 *               board_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The task was updated
 *       500:
 *         description: Some server error
 *       404:
 *         description: The task not found by ID
 *
 */
router.put('/task/:id', TaskController.updateTaskById)
/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: Delete the task by ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: The task was deleted
 *       500:
 *         description: Some server error
 *       404:
 *         description: The task not found by ID
 *
 */
router.delete('/task/:id', TaskController.deleteTaskById)
//

export default router;