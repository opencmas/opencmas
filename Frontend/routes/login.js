const express = require('express');
const http = require('http');
const path = require('path');
const { env } = require('process');
const Client = require('ssh2').Client;
const NodeRSA = require("node-rsa");
const { create } = require('domain');
const JSEncrypt = require('node-jsencrypt');  

const router = express.Router();


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

const privKey = "-----BEGIN RSA PRIVATE KEY----- MIICXQIBAAKBgQChhYOMHPLUh/bkL36vPLxeJqLjxZgzAtluQYXN4g96zu07bVpi zfEGLmpEX3YeW4eyVl4pGVGU2zFB6Y3dG4gZj67VjuWOakVRP4i/ACMsmmMVTnnY I8/CEJRCnsiAgdagEYB4pFOAccXJYZnYJRSJ8W1PUqvph53OCBNXw87QGwIDAQAB AoGBAIRKo1Sl/SmfdtKsJ9mFKE8A3BcsJp1ZLxbD6cCX78/JHbq3tPkJ7ef/KiB4 A3mXxAuH+7UzvILsCGsQzJWVUCE6Br53mvUGxCU20e572J4xk9ifMxZGWWk58FHK ALXVGjkpJ4e+9cnpI6VlabaPmDo6oR7vvTnc/giFM1Le49W5AkEA1H0XIa7dJ2OR 1KtzUuo8boprB4YgdI8v02Ol21ZsGtOA9O4Ngo8NkHuTrVGfP4Wum1HgGKhKTYaO sXb4hn8zlQJBAMKYqsVS54b9rTkMef34bJExb0CiVlULA68WQjjeDUwNHxYBkk8h TpiFwtYMSrB7Wyh/Ooz7/P/NIqP5T3dtCO8CQDFlXvI6lzin4efBb46v2xqLXPQj zvmpq6GFgbHqdjkKP+kwSb23CZ0zzRG2bsGyjvOWZfT1ckhxZkyE7qM9gL0CQQC5 NeUTehyy9q7wJVfWyaNLbemdcuUIfDs9YcoVpgKx56s2nrhKaEEOGgGfCIPuBPp2 SOHJXe0m6m+V8awY1sYxAkAyoroqv0DPY3ly9JEolKI0C6LiB2QCr9rW04rJbPVT 1u4BQuYCi/qrfQdcCUOIQXCLM6t/LhEtZcjuYxdNkQh7 -----END RSA PRIVATE KEY-----";

function decryptMessage(username){

    let key_private = new NodeRSA(privKey);

    var decrypt = key_private.decrypt(username, 'utf8');
    console.log(decrypt);
}

function createKeys(){

    const key = new NodeRSA({b: 1024});
    key.setOptions({encryptionScheme: 'pkcs1_oaep'});

    var publicKey = key.exportKey('public');
    var privateKey = key.exportKey('private');

    console.log(publicKey);
    console.log(privateKey);

}

router.post('/', (req, res, next) => {

    var username = req.body.username;
    var password = req.body.password;
   
    var key = new NodeRSA(privateKey);

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
                
                }).on('data', function(data) {
                console.log('OUTPUT: ' + data);
                });
                stream.end('ls -l\nexit\n');
                return res.status(200).json({authentication: "Successfully"});
            });
            }).on('error', function(err){
                console.error('Authentication failed');                         //Wrong Username/Password
                return res.send({authentication: "Failed"});
            }).connect({
            host: env.serverIP || '192.168.1.5',                                //ServerIP Address
            port: 16500,
            username: usernameDecrypted,
            password: passwordDecrypted
        });   

     // return res.status(200).json({authentication: "DEMOU"});
});

module.exports = router;
