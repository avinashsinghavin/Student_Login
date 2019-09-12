var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/giet";
var express = require('express');
var app = express();
app.use(express.static('public')); 
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
//-------------------------------------------------
var http = require('http');
var fs = require('fs');
//---------------------------
app.get('/', function( req, res){
    res.sendFile(__dirname+"/"+"first.html"); 
});
app.get('/studentlog', function( req, res){
  res.sendFile(__dirname+"/"+"studentlog.html"); 
});
app.get('/student', function( req, res){
    res.sendFile(__dirname+"/"+"student.html");
});
app.get('/register', function( req, res){
    res.sendFile(__dirname+"/"+"register.html");
});
app.post('/ssubmit', function (req, res) {
    var sr = req.body.uid;
    var pas = req.body.pass;
    MongoClient.connect(url, function(err, db1) {
      var db=db1.db('giet');
      //res.write(sr+"\n");
      var query = { userid : sr };//{age:parseInt(41)} for integer ..
      db.collection("std").find(query).toArray(function(err, result){    
        var i=0;
        //res.write("Enter In Body\n");
        try{
          var name = result[i]['Name'];
          var uid = result[i]['userid'];
          var age = result[i]['Age'];
          var pass =  result[i]['password'];
          var ph = result[i]['phone'];
          var dad = result[i]['father'];
          var email=result[i]['email'];
          if(pass == pas && uid ===sr){
              //res.write(" "+name+age);
              fs.readFile('studentlog.html', (err, data) => {
                if (err) {
                  res.writeHead(500);
                  res.end(err);
                  return;
                }
                data = data.toString().replace(/\{\{someVal\}\}/, name);
                data = data.toString().replace(/\{\{Name\}\}/, name);
                data = data.toString().replace(/\{\{phone\}\}/, ph);
                data = data.toString().replace(/\{\{father\}\}/, dad);
                data = data.toString().replace(/\{\{email\}\}/, email);
                res.writeHead(200);
                res.end(data, 'utf8');
            });
          } else{
            fs.readFile('login.html', (err, data) => {
                if (err) {
                  res.writeHead(500);
                  res.end(err);
                  return;
                }
                data = data.toString().replace(/\{\{'someVal'\}\}/, 'aavinas');
                res.writeHead(200);
                res.end(data, 'utf8');
            });
          }    
        } catch(e){
          console.log(e);
        }
        //db.close();  
      });
    });
});
app.get('/teacher', function( req, res){
    res.sendFile(__dirname+"/"+"teacher.html");
});
app.post('/sregister', function( req, res){
    var name = req.body.name;
    var uid = req.body.uid;
    var pw1 = req.body.pw1;
    var pw2 = req.body.pw2;
    var age = req.body.age;
    var father = req.body.fathername;
    var pin = req.body.pincode;
    var email = req.body.emailid;
    var dob = req.body.dob;
    var ph = req.body.mobileno;
    if(pw1 === pw2){
        try{
            MongoClient.connect(url, function(err, db1) {//db
                var db = db1.db('giet');//changed no need 
                var myobj = { Name:name,Age:age,phone:ph,email:email,userid:uid,password:pw1,dob:dob,father:father,pin:pin };
                db.collection("std").insertOne(myobj, function(err, res) {
                    console.log("1 record inserted");
                    db1.close();//db
                });
            });
            res.sendFile(__dirname+"/student.html");
        }catch(e){
            res.write("sdfdsfd");
            res.sendFile(__dirname+"/register.html");
        } 
    }else{
        res.sendFile(__dirname+"/register.html");
    }
});
var server = app.listen(1152,function(){
    console.log('Node Server Is running 1152');
});