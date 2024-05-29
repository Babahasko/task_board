import sequelize from "../db.js";
import {DataTypes} from "sequelize";

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