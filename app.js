var express = require('express');
var config = require('./config/config.js');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync(path.join('.permissions/bot.pem')),
  cert: fs.readFileSync(path.join('.permissions/bot.cert'))
};
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
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

http.createServer(app).listen(port);
https.createServer(options, app).listen(port);
console.log('Server listening on port ' + port);
