const fs = require('fs');

const CUSTOM_PHRASE_LOC = `${__dirname}/../custom-phrases.json`;

module.exports = Train;


function Train(Brain, speech, message) {
  console.log('Inside on-the-fly training module.');
  console.log('Asking user for name of skill.');
  const phraseExamples = [];
  let phraseName;
  speech.startConversation(message, (err, convo) => {
    convo.ask('Sure, what do you want to call this skill? ' +
            'This is the machine name, so pick a good name for a file basename.', [
              {
                pattern: '.*',
                callback(response, convo) {
                  phraseName = response.text;
                  convo.say(`Right, I'll call it \`${phraseName}\`.`);
                  convo.say('Okay, now give me a bunch of ways you might say this. ' +
                        'When you\'re done, just sent me the word done all by itself on a line.');
                  convo.ask('How might you say this?', [
                    {
                      pattern: '.*',
                      callback(response, convo) {
                        phraseExamples.push(response.text);
                        reprompt(convo);
                        convo.next();
                      },
                    },
                  ]);
                  convo.next();
                },
              },
            ]);

    function reprompt(convo) {
      convo.ask('Okay, how else?', [
        {
          pattern: '^done$',
          callback(response, convo) {
            convo.say('Great, now let me think about that...');
            Brain.teach(phraseName, phraseExamples);
            Brain.think();
            writeSkill(phraseName, phraseExamples, (err) => {
              if (err) {
                return convo.say(`${'Shoot, something went wrong while I was trying ' +
                                    'to add that to my brain:\n```\n'}${JSON.stringify(err)}\n\`\`\``);
              }
              convo.say('All done! You should try seeing if I understood now!');
            });
            convo.next();
          },
        },
        {
          pattern: '.*',
          callback(response, convo) {
            phraseExamples.push(response.text);
            reprompt(convo);
            convo.next();
          },
        },
      ]);
    }
  });
}

function writeSkill(name, vocab, callback) {
  console.log('About to write files for a new empty phrase/skill type...');
  fs.readFile(CUSTOM_PHRASE_LOC, (err, data) => {
    if (err) {
      console.error('Error loading custom phrase JSON into memory.');
      return callback(err);
    }
    console.log('Parsing custom phrase JSON');
    const customPhrases = JSON.parse(data.toString());
    customPhrases[name] = vocab;
    console.log('About to serialize and write new phrase object...');
    fs.writeFile(CUSTOM_PHRASE_LOC, JSON.stringify(customPhrases, null, 2), (err) => {
      if (err) {
        console.error('Error while writing new serialized phrase object.');
        return callback(err);
      }
      console.log('Writing updated phrase JSON finished, copying empty.skill.js...');
      const emptySkillStream = fs.createReadStream(`${__dirname}/empty.skill.js`);
      const writeStream = fs.createWriteStream(`${__dirname}/../skills/${name}.js`);
      emptySkillStream.pipe(writeStream);
      emptySkillStream.on('error', callback);
      writeStream.on('error', callback);
      writeStream.on('finish', callback.bind(null, null));
    });
  });
}
