import {DataTypes} from 'sequelize';
import sequelize from '../db.js';
import {Task} from './task.js'

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