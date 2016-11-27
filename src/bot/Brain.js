// Libraries
const NLP = require('natural');
const sentiment = require('sentiment');
const winston = require('winston');

function toMaxValue(x, y) {
  return x && x.value > y.value ? x : y;
}

class Brain {
  constructor() {
    this.classifier = new NLP.LogisticRegressionClassifier();
    this.minConfidence = 0.7;
    this.response = {};
  }

  teach(label, phrases) {
    phrases.forEach((phrase) => {
      winston.log('info', `Ingesting example for ${label}: ${phrase}`);
      this.classifier.addDocument(phrase.toLowerCase(), label);
    });
  }

  think() {
    this.classifier.train();

    // save the classifier for later use
    const aPath = './classifiers/classifier.json';
    this.classifier.save(aPath, (err, classifier) => {
      // the classifier is saved to the classifier.json file!
      winston.log('info', 'Writing: Creating a Classifier file in SRC.');
    });

    return this;
  }

  interpret(phrase) {
    const guesses = this.classifier.getClassifications(phrase.toLowerCase());
    const guess = guesses.reduce(toMaxValue);
    return {
      probabilities: guesses,
      guess: guess.value > this.minConfidence ? guess.label : null,
    };
  }

  invoke(skill, info, bot, message) {
    let skillCode;

    // check the sentiment
    const senti = sentiment(message.text);
    if (senti.score !== 0) {
      winston.log('info', '\n\tSentiment value: ');
      console.dir(senti);
      winston.log('info', '\n');
    }

    winston.log('info', `Grabbing code for skill: ${skill}`);
    try {
      skillCode = require(`./../skills/${skill}`);
    } catch (err) {
      throw new Error(`The invoked skill doesn't exist ${skill}!`);
    }
    winston.log('info', `Running skill code for ${skill}...`);
    return skillCode(skill, info, bot, message, senti);
  }
}

module.exports = Brain;

