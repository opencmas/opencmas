const jwt = require('jsonwebtoken');
const express = require('express');
const path = require('path');


const app = express();

module.exports = (req, res, next) =>{
    try{


        var cookie = req.headers.cookie;
       // console.log("TEST:");
        
        cookie = cookie.replace('auth-cookie=', '')
        //  console.log(cookie);

        //const token = req.headers.authorization;

        const token = cookie;

        if(!token){
            console.log("Token not provided!");
            res.sendFile(path.join(__dirname,'../public/html/login.html'));
        }
        else{
            const decoded = jwt.verify(token, 'secret');
            //console.log(decoded.type);
            
            if(decoded.type == "full-session")
                next();
            else
                res.sendFile(path.join(__dirname,'../public/html/login.html'));

            
        }
        
    }catch(error){
       // console.log(error);

        res.sendFile(path.join(__dirname,'../public/html/login.html'))
       
    }
   


};