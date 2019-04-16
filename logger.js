const winston = require('winston');
const { format } = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.printf(info => `${info.level}: ${info.message} - ${info.timestamp}`)
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.Console({ level: 'debug' })
    ]
  });

  process.on('uncaughtException', error => {
    logger.error(`uncaught exception: ${error}`);
  })

  module.exports = logger;