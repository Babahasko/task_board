import express from "express";
import BoardTaskController from "./controllers/BoardTaskController.js";
const router = express();

//BoardRouter
router.post('/board', BoardTaskController.createBoard)
//

export default router;