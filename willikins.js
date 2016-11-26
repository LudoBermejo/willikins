// Phrases
const builtinPhrases = require('./data/builtinsPhrases.json');
const customPhrases = require('./data/customPhrases.json');

// Willikins bot
 const Willikins = require('./src/bot/Willikins');

const willikins = new Willikins( process.argv[2], builtinPhrases, customPhrases );

willikins.init();
