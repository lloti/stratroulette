let strats = require('./strats.json');

module.exports = (req, res) => {
  let stratMap = req.query.map;
  let stratSide = req.query.side || 'Both';
  let stratConcat = strats.general.concat(strats[stratMap], strats[stratMap], strats[stratMap]);
  res.setHeader('Content-Type', 'application/json');
  (roll = () => {
    let strat = stratConcat[Math.floor(Math.random() * stratConcat.length)];
    if (strat.side === 'Both' || strat.side === stratSide.toUpperCase()) {
      res.json(strat);
    } else {
      roll();
    }
  })();
}
