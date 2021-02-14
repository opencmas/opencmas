const jwt = require('jsonwebtoken');
const express = require('express');
const path = require('path');


const app = express();

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization;
        if(!token){
            console.log("Token not provided!");
            res.sendFile(path.join(__dirname,'../public/html/login.html'));
        }
        else{
            const decoded = jwt.verify(token, 'secret');
            next();
        }
        
    }catch(error){
        console.log(error);

        res.sendFile(path.join(__dirname,'../public/html/login.html'))
       
    }
   


};