import {DataTypes, Model} from 'sequelize';
import sequelize from '../db.js';

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

export const Task = sequelize.define(
    "Task",
    {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Task',
        freezeTableName: true,
    });

Board.hasMany(Task);
Task.belongsTo(Board);