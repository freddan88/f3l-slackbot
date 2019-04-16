require('dotenv').config();
const path = require('path');
const Botkit = require('botkit');

const logger = require(path.join(__dirname, 'logger'));

console.log(process.env.NODE_ENV);
logger.info('This is sent to a combined.log file');
logger.error('This is sent to a error.log file');
logger.debug('Console');

[
    'NODE_ENV'
].forEach(name => {
    if(!process.env[name]){
        const log = `Environment variable ${name} is missing`;
        logger.error(log);
        throw new Error(log);
    }
})

const controller = Botkit.slackbot({
    json_file_store: './db_slackbutton_slash_command/',
    debug: process.env.NODE_ENV === 'production' ? 'false' : 'true',
    clientSigningSecret: process.env.CLIENT_SIGNING_SECRET
});

controller.configureSlackApp({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    clientSigningSecret: process.env.CLIENT_SIGNING_SECRET,
    scopes: ['commands','bot','chat:write:bot','channels:read','im:reaad','incoming-webhook']
});

const bot = controller.spawn({
    token: process.env.BOT_TOKEN,
    incoming_webhook: {
        url: 'https://hooks.slack.com/services/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'
    }
}).startRTM();

const PORT = process.env.PORT || 3000;
controller.setupWebserver(PORT, (err, webserver) => {
    controller.createOauthEndpoints(controller.webserver, 
        (err, req, res) => {
            if (err) {
                logger.error(err);
                res.status(500).send(`Error: ${err}`);
            }

            res.send('Connected to Slack');
        })
});

const hears = require(path.join(__dirname, 'skills/hears'));
const convo = require(path.join(__dirname, 'skills/convo'));
const jokeApi = require(path.join(__dirname, 'skills/api'));
hears(controller);
convo(controller);
jokeApi(controller);