const express = require('express');
const http = require('http');
const path = require('path');
const app = express();

const login = require('./routes/login');


app.use('/static', express.static('public'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'/login.html'))
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('*');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT','POST','PATCH', 'DELETE', 'GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/login', login);
 
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;