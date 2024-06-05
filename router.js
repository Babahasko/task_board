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
 * tags:
 *   name: Board
 *   description: The board managing API
 * /api/board/{id}:
 *   get:
 *     summary: Get the board by id
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The board id
 *     responses:
 *       200:
 *         description: The board response by id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       500:
 *         description: Some server error
 *
 */
router.get('/board/:id', BoardController.getBoardById)
/**
 * @swagger
 * tags:
 *   name: Board
 *   description: The board managing API
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
 * tags:
 *   name: Board
 *   description: The board managing API
 * /api/board/{id}:
 *   put:
 *     summary: Update the board by id
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The board id
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
 *       500:
 *         description: Some server error
 *
 */
router.put('/board/:id', BoardController.updateBoardById)
/**
 * @swagger
 * tags:
 *   name: Board
 *   description: The board managing API
 * /api/board/{id}:
 *   delete:
 *     summary: Delete the board by id
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The board id
 *     responses:
 *       200:
 *         description: The board was deleted
 *       500:
 *         description: Some server error
 *
 */
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