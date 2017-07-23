const request = require('request');

module.exports = (req, res) => {
  request('https://discordapp.com/api/guilds/314099968438829058/widget.json', (error, response, body) => {
    res.redirect(JSON.parse(body)['instant_invite']);
  });
};
