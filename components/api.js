let strats = require('./strats.json');

module.exports = (req, res) => {
  let stratMap = req.query.map;
  let stratSide = req.query.side || 'Both';
  let stratConcat = strats.general.concat(strats[stratMap], strats[stratMap], strats[stratMap]);
  res.setHeader('Content-Type', 'application/json');
  (roll = () => {
    let strat = stratConcat[Math.floor(Math.random() * stratConcat.length)];
    try {
      if (typeof strat.side !== 'undefined' && strat.side === 'Both' || strat.side === stratSide.toUpperCase()) {
        res.json(strat);
      } else {
        roll();
      }
    }
    catch(err) {
      roll();
    }
  })();
}
