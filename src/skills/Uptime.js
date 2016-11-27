const os = require('os');
const Q = require('q');

function formatUptime(uptime) {
  let fuptime = uptime;
  let unit = 'second';
  if (uptime > 60) {
    fuptime = uptime / 60;
    unit = 'minute';
  }
  if (fuptime > 60) {
    fuptime /= 60;
    unit = 'hour';
  }
  if (fuptime !== 1) {
    unit = `${unit}s`;
  }

  fuptime = `${fuptime} ${unit}`;
  return fuptime;
}

module.exports = function (skill, info, bot, message) {
  return Q.fcall(() => {
    const hostname = os.hostname();
    const uptime = formatUptime(process.uptime());

    bot.reply(message,
      `Hello gentlemen. I'm Willikins, butler at your service since  ${uptime} on ${hostname}. I will help you with all the things you need from the *growth-tools* (in my opinion, a horrible name). 
If you need anything from me, please ask (and be polite). I can tell you about *status*, *results*, *videos*, *error* of batches. Usually I look in *production environment*, but you can ask me for *staging* if you need to.
I can tell you too if a batch *is finished*. You only need to ask.`);
  });
};
