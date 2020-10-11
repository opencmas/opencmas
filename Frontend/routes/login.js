const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const { env } = require('process');
const router = express.Router();
const Client = require('ssh2').Client;

var app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/',urlencodedParser, function(req, res) {
    
    var username = req.body.username
    var password = req.body.password

   // console.log(username);
   // console.log(password);

        var connection = new Client();
        connection.on('ready', function() 
        {
        console.log('Client :: ready');
        connection.shell(function(err, stream) 
        {
            if (err) {
                console.log('error auth');
            }
            stream.on('close', function() 
            {
            console.log('Stream :: close');
            
            }).on('data', function(data) {
            console.log('OUTPUT: ' + data);
            });
            stream.end('ls -l\nexit\n');
            return res.status(500).json({ 
                "Username:": username,
                "Password": password});
        });
        }).on('error', function(err){
            console.error('Authentication failed');                         //Wrong Username/Password
            return res.sendFile(path.join(__dirname,'../login_error.html'));
        }).connect({
        host: env.serverIP || '192.168.1.3',                                //ServerIP Address
        port: 1353,
        username: username,
        password: password
        });   

});



module.exports = router;