const fetch = require('node-fetch');
// const apiUri = '';
const logger = require('../logger');

module.exports = (controller) => {
    controller.hears(['Joke', 'Chuck', 'Tell me a joke', 'Give me a joke'], 'direct_message,direct_mention', (bot, message) => {
        bot.startConversation(message, jokeGenerator);
    });

    const jokeGenerator = (res, convo) => {

        convo.say('Chose a category: dev, movie, food, science, animal, history, music');
        convo.ask('...', async (res, convo) => {
        convo.say(`Sure. I will search for a joke within ${res.text} category`);

            try{
                const apiUrl = `https://api.chucknorris.io/jokes/random?category=${res.text}`;
                const r = await fetch(apiUrl);
                const joke = await r.json();

                console.log(joke);
                convo.say(joke.value);
                convo.next();
        
            }catch (err){
                logger.error(err);
                convo.say('Oops, wrong category. Plearse try again!');
                convo.next();
            }
        });
    }
}