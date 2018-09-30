const express = require('express'),
  app = express(),
  Nestel = require('../lib/nestel.js');

app.use(new Nestel({ deliminator: '.' }));

app.get('/', (req, res) => {
  res.send(req.query);
});

app.listen(3000, () => console.log('woot'));
