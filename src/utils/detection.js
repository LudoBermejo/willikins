const WordPOS = require('wordpos');
const Q = require('q');

const wordpos = new WordPOS();

module.exports = function (skill, info, bot, message, action) {
  const defer = Q.defer();
  message.text = message.text.split('-').join('joiningbyhand');
  wordpos.getPOS(message.text, (result) => {

    let client;
    let batchID;
    const environment = result.nouns.indexOf('staging') > -1 ? 'staging' : 'prod';

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
      bot.reply(message, `I will ask ${action} for client ${client} and batch ${batchID} in environment ${environment}`);
      defer.resolve({
        action,
        client,
        batchID,
        environment,
        bot,
        message
      })
    }
    defer.reject();
  });
  return defer.promise;
};

