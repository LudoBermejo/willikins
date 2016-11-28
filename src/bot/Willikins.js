// Utils
const fs = require('fs');
const winston = require('winston');

// Bot
const Train = require('./train');
const Brain = require('./Brain');
const Ears = require('./Ears');

class Willikins {
  constructor(bPhases, cPhrases) {
    this.builtinPhrases = bPhases;
    this.customPhrases = cPhrases;
  }

  learnPhrases() {
    winston.log('info', 'Willikins is learning...');
    Object.keys(this.customPhrases)
      .forEach(key => this.brain.teach(key, this.customPhrases[key]));
    Object.keys(this.builtinPhrases)
      .forEach(key => this.brain.teach(key, this.builtinPhrases[key]));
  }

  startHearing() {
    this.ears
      .listen()
      .hear('TRAINING TIME!!!', (speech, message) => {
        winston.log('info', 'Delegating to on-the-fly training module...');
        this.train(this.brain, speech, message);
      })
      .hear('.*', (speech, message) => {
        const interpretation = this.brain.interpret(message.text);
        winston.log('info', `Willikins heard: ${message.text}`);
        winston.log('info', 'Willikins interpretation: ', interpretation);
        if (interpretation.guess) {
          winston.log('info', `Invoking skill: ${interpretation.guess}`);
          this.brain.invoke(interpretation.guess, interpretation, speech, message)
            .then((response) => {
              if (response && this.callback) this.callback(response);
            })
            .catch(() => winston.log('debug', 'Nothing to do'))

        } else {
          speech.reply(message, 'Hmm... I don\'t have a response what you said... I\'ll save it and try to learn about it later.');
          // speech.reply(message, '```\n' + JSON.stringify(interpretation) + '\n```');

          // append.write [message.text] ---> to a file
          fs.appendFile(`${__dirname}/../../newData/phrase-errors.txt`,
            `\nChannel: ${message.channel} User:${message.user} - ${message.text}`, (err) => {
              winston.log('info', `Brain Err: Appending phrase for  ${message.text} error ${err}\n`);
            });
        }
      });
  }

  init(token, callback) {
    this.token = token;
    this.callback = callback;
    this.train = Train;
    this.brain = new Brain();

    this.ears = new Ears(this.token);
    this.learnPhrases();
    this.brain.think();
    winston.log('info', 'Willikins finished learning, time to listen...');
    this.startHearing();
  }
}

module.exports = Willikins;
