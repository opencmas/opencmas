const jwt = require('jsonwebtoken');
const express = require('express');
const path = require('path');


const app = express();
var token;

module.exports = (req, res, next) =>{
    try{

        
        var cookie = req.headers.cookie;
        //console.log(cookie);
        //console.log(req.headers);
        
        if(!cookie){
            res.send({ "authentication": "failed" });
        }
        else{
            token = cookie.replace('auth-cookie=', '');

        }
      
        if(token){
            const decoded = jwt.verify(token, 'secret');
            console.log(decoded);

            if(decoded.type == "login-session")
                next();
            else 
                res.send({ Authentication: "failed" });


        }
        
    }catch(error){
        console.log(error);

        res.sendFile(path.join(__dirname,'../public/html/login.html'))
       
    }
   


};