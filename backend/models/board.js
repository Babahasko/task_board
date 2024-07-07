import {DataTypes} from 'sequelize';
import sequelize from '../db.js';
import {Task} from './task.js'

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:     # <-- arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   security:
 *     - bearerAuth: []
 *   schemas:
 *     Board:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the board
 *         name:
 *           type: string
 *           description: The title of your board
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the board was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the board was updated
 *       example:
 *         id: 1
 *         title: Today`s Task`s
 *         createdAt: 2024-05-10T04:05:06.157Z
 *         updatedAt: 2025-05-10T04:05:06.157Z
 */

export const Board = sequelize.define(
    'Board',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'Board',
        freezeTableName: true,
    });

Board.hasMany(Task);
Task.belongsTo(Board);