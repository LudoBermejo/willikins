const WordPOS = require('wordpos');

const wordpos = new WordPOS();

module.exports = function (skill, info, bot, message, action) {
  message.text = message.text.split('-').join('joiningbyhand');
  wordpos.getPOS(message.text, (result) => {
    let client;
    let batchID;
    const environment = (result.verbs.indexOf('prod') > -1 || result.nouns.indexOf('production') > -1) ? 'prod' : 'staging';
    result.rest.forEach((data) => {
      if(data) {
        const myData = data.split('joiningbyhand').join('-');
        console.log(myData);
        if (myData.length < 10) {
          client = myData;
        } else {
          batchID = myData;
        }
      }
    });

    if (!client) {
      bot.reply(message, 'I\'m afraid you forgot to add the client');
    } else if (!action) {
      bot.reply(message, 'I\'m afraid you forgot to tell me what to do');
    } else if (!batchID) {
      bot.reply(message, 'I\'m afraid you forgot the batch you want to use');
    } else {
      bot.reply(message, `node commander.js ${action} ${client} ${batchID} --environment ${environment}`);
      return {
        action,
        client,
        batchID,
      }
    }
    return false;
  });
};

