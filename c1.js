var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/giet";
var express = require('express');
var app = express();
app.use(express.static('public')); 
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
var x="avinash KUMAR SINGH";
var fs = require('fs');
//--------------------------------------------------------------------------------
app.get('/', function( req, res){
    fs.readFile('index.html', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end(err);
          return;
        }
        data = data.toString().replace(/\{\{someVal\}\}/, x);
        res.writeHead(200);
        res.end(data, 'utf8');
    });
});
//--------------------------------
/*
var http = require('http');
var fs = require('fs');
http.createServer((req, res) => {
  fs.readFile('index.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end(err);
      return;
    }

    data = data.toString().replace(/\{\{someVal\}\}/, x);
    res.writeHead(200);
    res.end(data, 'utf8');
  });
});
*/
var server = app.listen(8080,function(){
    console.log('Node Server Is running 8080');
});