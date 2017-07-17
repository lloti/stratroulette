
// Config
const cfg = require('./config.json');

// Strats json
const strats = require('./components/strats.json');

// fs
const fs = require('fs');

// Express Stuff
const cors = require('cors');

// Express w/ socket.io
const express = require('express');
const socket = require('socket.io');
const app = express();
const server = app.listen(5000);
const io = socket.listen(server);

// Express
app.use(cors());
app.get('/json', require('./components/json'));
app.get('/api', require('./components/api'));
app.use('/', express.static('./public'));

// Redirect errors to root
app.use((req,res)=>res.redirect('/'));

io.sockets.on('connection', (socket) => {
  socket.on('password', (data) => {
    if (data === cfg.password) {
      fs.readFile('./components/_strats.json', 'utf8', (err, data) => {
        let json = JSON.parse(data);
        socket.emit('login');
        socket.emit('reload', json)
      });
      socket.on('add', (num) => {
        fs.readFile('./components/_strats.json', 'utf8', (err, data) => {
          let json = JSON.parse(data);
          let strat = json[num];
          json.splice(num, 1);
          fs.writeFile('./components/_strats.json', JSON.stringify(json));
          fs.readFile('./components/strats.json', 'utf8', (err, data) => {
            let json2 = JSON.parse(data);
            let map = strat.map;
            delete strat.map;
            json2[map].push(strat);
            fs.writeFile('./components/strats.json', JSON.stringify(json2));
          });
          socket.emit('reload', json);
        });
      });
      socket.on('remove', (num) => {
        fs.readFile('./components/_strats.json', 'utf8', (err, data) => {
          let json = JSON.parse(data);
          json.splice(num, 1)
          fs.writeFile('./components/_strats.json', JSON.stringify(json));
          socket.emit('reload', json);
        });
      });
    } else {
      socket.emit('failedPassword');
    }
  });
  socket.on('new', (json) => {
    let maps = [
      'general',
      'agency',
      'assault',
      'austria',
      'aztec',
      'blackgold',
      'cache',
      'canals',
      'cobblestone',
      'dust',
      'dust2',
      'inferno',
      'insertion',
      'italy',
      'lite',
      'militia',
      'mirage',
      'nuke',
      'office',
      'overpass',
      'shipped',
      'thrill',
      'train',
      'vertigo'
    ],
    sides = [
      'Both',
      'CT',
      'T'
    ];
    if (maps.includes(json.map) && sides.includes(json.side)) {
      socket.emit('accepted');
      fs.readFile('./components/_strats.json', 'utf8', (err, data) => {
        let json2 = JSON.parse(data);
        json2.push(json);
        fs.writeFile('./components/_strats.json', JSON.stringify(json2));
      });
    }
  });
});
