const winston = require('winston');

const logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
        winston.format.json(),
        winston.format.colorize({ all: true }),
        winston.format.timestamp()
    ),
    transports: [new winston.transports.Console()],
});

module.exports = {
    logger
}