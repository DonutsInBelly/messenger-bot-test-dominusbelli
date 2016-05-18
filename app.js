var express = require('express');
var config = require('./config/config.js');
var path = require('path');

var app = express();
// app.use(express.static(__dirname + 'views'));
var port = process.env.PORT || 8080;

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.get('/webhook', function(req, res){
  if(req.query['hub.verify_token'] === config.verify_token) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

app.listen(port);
console.log('Server listening on port ' + port);
