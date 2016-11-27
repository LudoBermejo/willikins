// Phrases
const builtinPhrases = require('./data/builtinsPhrases.json');
const customPhrases = require('./data/customPhrases.json');

// Willikins bot
const Willikins = require('./src/bot/Willikins');

const willikins = new Willikins(builtinPhrases, customPhrases );

module.exports = willikins;
