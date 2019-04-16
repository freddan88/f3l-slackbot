module.exports = (controller) => {
    controller.hears('start convo', 'direct_message,direct_mention', (bot, message) => {
        bot.startConversation(message, conversationExample);
    });

    const conversationExample = (res, convo) => {
        convo.ask('What do you want to say?', (res, convo) => {
            const text = res.text;
            convo.say('Interesting...');
            q1(res, convo);
            convo.next();
        });
    }

    const q1 = (res, convo) => {
        convo.addQuestion('Is that all?', (res, convo) => {
            convo.say('Bye bye...');
            q2(res, convo);
            convo.next();
        })
    }

    const q2 = (res, convo) => {
        convo.addQuestion('Now here?', (res, convo) => {
            convo.say('Yup...');
            convo.next();
        })
    }
}