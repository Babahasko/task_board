import {Sequelize} from "sequelize";

export default new Sequelize(
    "task_board_db",
    "postgres",
    "postgres",
    {
        host: "localhost",
        port: "5431",
        dialect: "postgres",
    }
)


