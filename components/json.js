module.exports = (req, res) => {
 res.setHeader('Content-Type', 'application/json');
 res.json(require('./strats.json'));
}
