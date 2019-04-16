const fetch = require('node-fetch');
// const apiUri = '';
const logger = require('../logger');

module.exports = (controller) => {
    controller.hears(['Joke', 'Tell me a joke', 'Give me a joke'], 'direct_message,direct_mention', (bot, message) => {
        
        bot.startConversation(message, jokeGenerator);
    });

    const jokeGenerator = (res, convo) => {

        convo.say('Chose a category, available categories: Miscellaneous, Programming, Dark, Any');
        convo.ask('...', async (res, convo) => {

            convo.say(`Sure. I will search for a joke within ${res.text} category`);

            const r = await fetch(`https://sv443.net/jokeapi/category/${res.text}?blacklistFlags=nsfwreligiouspolitical`);
 
            const joke = await r.json();
            console.log(joke);
            convo.say(joke.setup);
            convo.next();
            // try {
            //     const r = await fetch(`https://sv443.net/jokeapi/category/${res.text}?blacklistFlags=nsfwreligiouspolitical`);

            //     if(r.status !== 200){
            //         throw new Error(r.statusText);
            //     }
            //     const joke = await r.json();
            //     convo.say(joke);
            //     convo.next();

            // } catch (err) {
            //     logger.error(err);
            //     convo.say('Oops, wrong category. Plearse try again!');
            //     convo.next();

            // }
        });
    }










}