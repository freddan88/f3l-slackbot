require('dotenv').config();
const path = require('path');

const logger = require(path.join(__dirname, 'logger'));

console.log(process.env.NODE_ENV);
logger.info('This is sent to a combined.log file');
logger.error('This is sent to a error.log file');
logger.debug('Console');

[
    'NODE_ENV'
].forEach(name => {
    if(!process.env[name]){
        const log = `Ènvironment variable ${name} is missing`;
        logger.error(log);
        throw new Error(log);
    }
})