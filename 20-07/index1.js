const express = require('express');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');
const bodyParser = require('body-parser')
//body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.
var server = express();
const path = require('path')
//The Path module provides a way of working with directories and file paths.
var nodemailer = require("nodemailer");
server.use(bodyParser.urlencoded({ extended: true }))
var fileWrite = require('./fileOperations');
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    secure: false,
    auth: {
        user: "arunmehtajkg@gmail.com",
        pass: "Arun@1234"
    }
});
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

let mailOptions, host, link;
server.use(bodyParser.json())
server.post('/',function(req,err)
{
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("my");
        dbo.createCollection("custom", function(err, res) {
          if (err) throw err;
          console.log("Collection created!");
          db.close();
        });
      });
});


server.post('/insert', function (req, res) {
    let ready = req.body;
    let userEmail = req.body.email;
    console.log("user email -->"+ userEmail);
    let header = {
        email1 : userEmail
    };
    jwt.sign({header},'secretKey',(err,token) =>
    {

        res.json({token})
    });
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("my");
       /// var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("custom").insertOne(ready, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          console.log(ready);
          host = req.get('host');

          var d = new Date();
          var encryptedAES = cryptr.encrypt(userEmail + "_" + d);
          console.log("host work");
          link = "http://" + req.get('host') + "/verify?token=" + encryptedAES;
          mailOptions = {
              to: userEmail,
              subject: "Please confirm your Email account",
              html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
          }
          smtpTransport.sendMail(mailOptions, function (err, data) {
              if (err) {
                console.log(err);
                  res.end(err);
              } else {
              res. end(token);
              console.log(token);
              return;
              return res.status(404).send({token});
          }
          });
          db.close();
        });
      });
   
});


server.get('/verify', function (req, res) {
    let decryptedBytes = cryptr.decrypt(req.query.token);
    token = decryptedBytes.split("_")
    let r = new Date(token[1]);
    r=r.getTime();
    var d = new Date();
    d=d.getTime();
    d=d-30000;
    if (r >=d) {
        let status = "status";
        let value = true;
        fileWrite.readFileCallback('sign.json', function (err, data) {
            data1 = JSON.parse(data)
            data1[token[0]][status] = value;
            fileWrite.writeFileCallback('sign.json', JSON.stringify(data1), function (err, data) {
                return res.send({ "success": true, "for any other information": "go http://google.com" })
            });
        });
    }
    else {
        return res.send({ "status": "expire" })
    }
});

function verifyToken(req,res,next)
{
    let bearerHeader = req.headers['token'];
    console.log("1   ---->    "+bearerHeader);
    if(typeof bearerHeader !== 'undefined')
    {  
       let bearer = bearerHeader.split(' ');
       let bearerToken =bearer[1];
       console.log("2   ---->    "+bearerToken);
       req.token = bearerToken;
       next();

     }
    else {
        res.sendStatus(403)
    }
}


server.post('/access',verifyToken,(req,res) =>
{   let toview =req.body.email;
     console.log("3   ---->    " +req.token);
        jwt.verify(req.token ,'secretKey',(err,authoData) =>
     { // console.log( jwtDecode(req.authorization));
        console.log(authoData);
        let data50=authoData;
        let data51 =data50["header"]["email1"];
        if(err)
        {
            //res.send(err)
            res.json({
                message : 'Error'
             
             });     
       }
        else{
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("my");
                dbo.collection("custom").findOne({}, function(err, result) {
                  if (err) throw err;
                  console.log(result);
                  res.send(result);
                  db.close();
                });
              });
            }
        });
    });
server.listen(8089, '0.0.0.0');
console.log('loalhost:8089/ \n');
