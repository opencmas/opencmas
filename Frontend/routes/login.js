const express = require('express');
const http = require('http');
const path = require('path');
const { env } = require('process');
const Client = require('ssh2').Client;
const { create } = require('domain');
const JSEncrypt = require('node-jsencrypt');  
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const router = express.Router();


  const signingOptions = {
    keyid: 'auth-jwt',
    algorithm: 'RS256',
    expiresIn: '6h',
  };
  


const privateKey = 
"-----BEGIN RSA PRIVATE KEY-----\n" +
"MIICXQIBAAKBgQDrn+GYJO9Gkbt7QzKWOe3EQF04rd5tMzwAAZ+LYiVq4wDjabGp\n" +
"MsQsbv7zkUPbMFwh5sEaQLMXVaA7tn2zlb+Ma+7NceigHhnX4jl5vErWcAlT2CsK\n" +
"mBopVocKDEHhxeZ2v3xfWQHSU5n++sNAQWaWaR+kHqMSmQ8bCM22HM6EgwIDAQAB\n" + 
"AoGBAOkdci17hTuVXR5zei4EvAcpAtHbuy7gvKDo+jcFcC2Sz0MvQ7U5Y7ruSdEi\n" +
"TDckXlKwISZfEpCoh3Hsd+rf4fQepFKTT6MVMmaVhg8JIbY6BDW8rsQjeoyOv7og\n" +
"F6nE9GPN2/gFm1uKSnza3GoUwXE6hpduvhGIQngljIEiVF5RAkEA+MFA/nOwGg4x\n" +
"KjX+dp1zTB5zf7ImW4Z4rJmFUqcf6ZK6CwmL+9YwzKrI57Z/Rpcfil6Qhyqmux6r\n" +
"pbfK5/ScWwJBAPJ8uc5PFY9uq4gxpGRxZ3f5S9pI0oomNImtbVomE1B60lwoq5VJ\n" +
"CG51i6zC/TOakd9NwKVNlPR6zbXgrpPyUPkCQQC46Ydz3vGgXL5lX1+6Ms67XcOD\n" + 
"wB1NWgeoXjLCPyO00HJltAIQAaei7K2NuZahFcPHawZKxATPAjycYqR9itMTAkAC\n" +
"OFIbKW4xGfpIDOxMXx1rY8TmArSqvx7MA+J0aNTUb8ttPJIVk82X9UuKEV7wEgIz\n" +
"4SpaWRN8CYPInn36rMVBAkBRLtGyJn/R2HF/2EiS6EW9+HkwtcTG5s1d3vaC30A1\n" +
"MTHy/xWaaqYPIZAqTQp+opACGFs+j5QShfyncsGDQ33A\n" +
"-----END RSA PRIVATE KEY-----";


router.post('/', (req, res, next) => {

    var username = req.body.username;
    var password = req.body.password;
   
    const crypt = new JSEncrypt();
    crypt.setPrivateKey(privateKey);
    var usernameDecrypted = crypt.decrypt(username);
    var passwordDecrypted = crypt.decrypt(password);

    console.log(username);
    console.log(password);

    console.log(usernameDecrypted);
    console.log(passwordDecrypted);

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
                
                }).on('data', function(data) 
                {
                console.log('OUTPUT: ' + data);
                
                });
                stream.end('ls -l\nexit\n');

                const payload = {
                    authentication: 'successfull',
                  };
                
                  const myToken = jwt.sign(payload, privateKey, signingOptions);
  
                  console.log(myToken);

                  res.cookie('auth-cookie', 'successfullAuthenticated', { maxAge: 900000});
                  res.end('END');
                //return res.status(200).json({authentication: "Successfully"});


            });
            }).on('error', function(err){
                console.error('Authentication failed');                         //Wrong Username/Password
                return res.send({authentication: "Failed"});
            }).connect({
            host: '192.168.1.5',                                //ServerIP Address
            port: 16500,
            username: usernameDecrypted,
            password: passwordDecrypted
        });   

     // return res.status(200).json({authentication: "DEMOU"});
});

module.exports = router;