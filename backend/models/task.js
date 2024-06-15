import sequelize from "../db.js";
import {DataTypes} from "sequelize";
/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the board
 *         content:
 *           type: string
 *           description: Your task
 *         done:
 *          type: boolean
 *          description: Status of your task. Default is false
 *         createdAt:
 *          type: string
 *          format: date
 *          description: The date the task was added
 *         updatedAt:
 *          type: string
 *          format: date
 *          description: The date the task was updated
 *         BoardId:
 *          type: number
 *          description: Foreign key for board id
 *       example:
 *         id: 1
 *         content: Придумать названия для бордов
 *         done: false
 *         createdAt: 2024-05-10T04:05:06.157Z
 *         updatedAt: 2025-05-10T04:05:06.157Z
 *         BoardId: 5
 */

export const Task = sequelize.define(
    "Task",
    {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Task',
        freezeTableName: true,
    });