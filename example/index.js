const express = require('express'),
  app = express(),
  Nestel = require('../dist/nestel.js');

app.use(new Nestel({ routes: ['/test'], deliminator: '.' }));

app.get('/', (req, res, next) => {
  console.log(req.query)
  res.send('good');
});

app.get('/test', (req, res, next) => {
  console.log(req.query)
  res.send('good');
});

app.listen(3000, () => console.log('woot'));