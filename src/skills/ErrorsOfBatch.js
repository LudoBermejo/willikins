const detection = require('./../utils/detection')
module.exports = function (skill, info, bot, message) {
  detection(skill, info, bot, message, 'error');
};
