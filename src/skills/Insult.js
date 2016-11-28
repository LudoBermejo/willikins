const detection = require('./../utils/detection')
const Q = require('q');

const listOfInsults =
  ["At least when I do a handstand my stomach does not hit me in the face.",
    "You have something on your chin... no, the 3rd one down",
    "How many times do I need to flush to get rid of you?",
    "I bet your brain feels as good as new, seeing that you never use it.",
    "I could eat a bowl of alphabet soup and shit out a smarter statement than that.",
    "I do not exactly hate you, but if you were on fire and I had water, I would drink it.",
    "I have neither the time nor the crayons to explain this to you.",
    "I may love to shop but I am not buying your bullshit.",
    "I was not born with enough middle fingers to let you know how I feel about you.",
    "I would like to see things from your point of view but I cannot seem to get my head that far up my ass.",
    "I would slap you, but shit stains.",
    "I am no proctologist, but I know an asshole when I see one.",
    "I am not saying I hate you, but I would unplug your life support to charge my phone.",
    "If I wanted to kill myself I would climb your ego and jump to your IQ.",
    "If I were to slap you, it would be considered animal abuse!",
    "If laughter is the best medicine, your face must be curing the world.",
    "If you are going to be two faced, at least make one of them pretty.",
    "If you are gonna be a smartass, first you have to be smart. Otherwise you are just an ass.",
    "Is your ass jealous of the amount of shit that just came out of your mouth?",
    "It looks like your face caught on fire and someone tried to put it out with a hammer.",
    "It is better to let someone think you are an idiot than to open your mouth and prove it.",
    "I am jealous of all the people that have not met you!",
    "Maybe if you ate some of that makeup you could be pretty on the inside.",
    "Roses are red violets are blue, God made me pretty, what happened to you?",
    "Roses are red, violets are blue, I have 5 fingers, the 3rd ones for you.",
    "Shut up, you will never be the man your mother is.",
    "Somewhere out there is a tree, tirelessly producing oxygen so you can breathe. I think you owe it an apology.",
    "The last time I saw a face like yours I fed it a banana.",
    "The only way you will ever get laid is if you crawl up a chicken ass and wait.",
    "Two wrongs do not make a right, take your parents as an example.",
    "Well I could agree with you, but then we would both be wrong.",
    "What are you going to do for a face when the baboon wants his butt back?",
    "You are so ugly, when your mom dropped you off at school she got a fine for littering.",
    "You bring everyone a lot of joy, when you leave the room.",
    "You must have been born on a highway because that is where most accidents happen.",
    "You should not play hide and seek, no one would look for you.",
    "Your birth certificate is an apology letter from the condom factory.",
    "Your family tree must be a cactus because everybody on it is a prick."
  ];

function randomIntFromInterval(val)
{
  return Math.floor(Math.random()*(val));
}

module.exports = function (skill, info, bot, message) {
  return Q.fcall(() => {
    bot.reply(message, `*${message.text.split('insult').join('')}*: ${listOfInsults[randomIntFromInterval(listOfInsults.length)]}`);
    return false;
  })

};

