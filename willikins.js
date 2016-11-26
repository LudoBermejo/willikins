// Config
const config = require('./config/config.json');

// Phrases
const builtinPhrases = require('./data/builtinsPhrases.json');
const customPhrases = require('./data/customPhrases.json');

// Willikins bot
const Willikins = require('./src/bot/Willikins');

const willikins = new Willikins( config, builtinPhrases, customPhrases );

willikins.init();
