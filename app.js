const express = require('express');
const cors = require('cors');
const app = express();

app.get('/api', cors(), require('./components/strats'));
app.use('/', express.static('./public'));

app.listen(5000);
