const BotKit = require('botkit');

const Bot = BotKit.slackbot({
  debug: false,
  storage: undefined,
});

class Ears {
  constructor(token) {
    this.scopes = [
      'direct_mention',
      'direct_message',
      'mention',
    ];

    // if we haven't defined a token, get the token from the session variable.
    if (Bot.token === undefined) {
      this.token = token;
    }
  }

  listen() {
    this.bot = Bot.spawn({
      token: this.token,
    }).startRTM();
    return this;
  }

  hear(pattern, callback) {
    Bot.hears(pattern, this.scopes, callback);
    return this;
  }
}

module.exports = Ears;
