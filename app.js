var express = require('express');
var config = require('./config/config.js');

var app = express();

app.get('/webhook', function(req, res){
  if(req.query['hub.verify_token'] === config.verify_token) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

app.listen(8080);
