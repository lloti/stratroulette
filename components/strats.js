const strats = require('./strats.json');

module.exports = function(req, res) {
 res.setHeader('Content-Type', 'application/json');
 let stratMap = req.query.map;
 let stratSide = req.query.side || 'Both';
 let stratConcat = strats.general.concat(strats[stratMap], strats[stratMap], strats[stratMap]);
 (roll = () => {
   let strat = stratConcat[Math.floor(Math.random() * stratConcat.length)];
   if (strat.side === 'Both' || strat.side === stratSide.toUpperCase()) {
     res.json(strat);
   } else {
     roll();
   }
 })();
}

