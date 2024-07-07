require('dotenv').config();
const express = require("express");
const {logger} = require("./utils/logger.js");
const {mongoose} = require("mongoose");
const authRouter = require('./authRouter');
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const host = '127.0.0.1';
app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
    try {
        await mongoose.connect('mongodb://'+ process.env.MONGO_USER + ':'+ process.env.MONGO_PASWWORD +'@127.0.0.1:27017/auth_roles');
        app.listen(PORT, host)
        logger.info("Server started on port: "+ PORT)
    } catch (e) {
        logger.error(e)
    }
}

start()