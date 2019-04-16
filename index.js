require('dotenv').config();
const logger = require ('./logger');

console.log(process.env.NODE_ENV);
logger.info('This is sent to a combined.log file');
logger.error('This is sent to a error.log file');
logger.debug('Console');