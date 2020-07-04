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


let mailOptions, host, link;
server.use(bodyParser.json())
server.post('/', function (req, res) {
    let ready = req.body;
 
    let holdData = {};
    let userEmail = req.body.email;
    console.log("user email -->"+ userEmail);
    // let header={
    //    email1 : userEmail
    // }
    let header = {
        email1 : userEmail
    };
    jwt.sign({header},'secretKey',(err,token) =>
    {

        res.json({token})
    })
    // header=JSON.stringify(header);
    // payload=JSON.stringify(payload);
    // payload = cryptr.encrypt(payload);
    // header=cryptr.encrypt(header);
    // let token1=sha256(base64(header)+"."+base64(payload));
    // console.log("Payload ----->  " +payload)
    //  token1=
    //  .update(base64URL(header)+"."+base64URL(payload))
    //  .digest('hex');
    //  console.log(token1);
     //      console.log("signature ---->  "+signature)
    
    fileWrite.readFileCallback('sign.json', function (err, data) {
        if (data.length != 0) {
            data = JSON.parse(data);
            if (data[userEmail]) {
                return res.status(403).send({ success: false, message: "it's already exist" })
            }
            data[userEmail] = ready;
            holdData = data;
            
        }
        else {
            holdData[userEmail] = ready;
        }
        fileWrite.writeFileCallback('sign.json', JSON.stringify(holdData), function (err, data) {
            host = req.get('host');

            var d = new Date();
            var encryptedAES = cryptr.encrypt(userEmail + "_" + d);
            link = "http://" + req.get('host') + "/verify?token=" + encryptedAES;
            mailOptions = {
                to: userEmail,
                subject: "Please confirm your Email account",
                html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
            }
            smtpTransport.sendMail(mailOptions, function (err, data) {
                if (err) {
                    res.send("error");
                } else {
                //     res.send(base64urlEncoding(header) + '.' + base64urlEncoding(payload) + '.' + base64urlEncoding(signature));
                //     console.log(base64urlEncoding(header) + '.' + base64urlEncoding(payload) + '.' + base64urlEncoding(signature));
                //     return res.status(404).send(base64urlEncoding(header) + '.' + base64urlEncoding(payload) + '.' + base64urlEncoding(signature))
                // 
               
                res. end(token);
                console.log(token);
                // let meh =cryptr.decrypt(token1);
                // console.log("meh ------->>>>>  "+meh);
                return;
                return res.status(404).send({token});
            }
            });
        });
    });
});
server.get('/userDetails', function (req, res) {
    let checkEmail = req.query.email;
    fileWrite.readFileCallback('sign.json', function (err, data) {
        data = JSON.parse(data)
        if (data[checkEmail]["status"] === "false") {
            return res.status(403).send({ success: false, message: "I don't know" })
        }
        else {
            return res.status(200).send(data[checkEmail])
        }
    })
});
/**
 * 
 */
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

// server.post('/access',function(req,res)
// {
//     let yo = req.headers.token;
//     yo =yo.split('.');
//     console.log(yo[1])
//     let clientEmail =cryptr.decrypt(yo[1]);
//     console.log(clientEmail)

// })
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
{    console.log("3   ---->    " +req.token);
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
             
             })     
       }
        else{
            // res.json({
            //     message : 'POST CREATE',
            //     data : authoData
            
            //  });
            // console.log(data50[header][email1])

    fileWrite.readFileCallback('sign.json', function (err, data) {
        if (data.length != 0) 
        {
           // data = JSON.stringify(data);
           data =JSON.parse(data);
           let data34=authoData["header"]["email1"];
           console.log(data34)
          // console.log(data51)
            console.log("45 --> " +data)
            console.log("46 --> "+data[data34]);

             if (data[data34]) 
             {
             
              console.log("check");
                    return res.send (data[authoData["header"]["email1"]]);
              }
             console.log("check 1");   
            //return res.send (data[authoData["header"]["email1"]]);       
        }
        else 
        {
             return res.status(403).send({ success: false, message: "email id not exist" })
        }
        
    })
        }
})
})
server.listen(8089, '0.0.0.0');
console.log('loalhost:8089/ \n');
