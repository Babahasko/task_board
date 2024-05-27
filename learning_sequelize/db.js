import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize(
    "test_db",
    "postgres",
    "postgres",
    {
        host: "localhost",
        port: "5431",
        dialect: "postgres",
    }
)

class User extends Model {}

User.init(
    {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
    },
);

console.log(User === sequelize.models.User)


