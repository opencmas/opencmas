const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require("mongoose");
const app = express();

const login = require('./routes/login');

const get_server_information = require("../Frontend/routes/get_server_information");
const get_server_information_history = require("../Frontend/routes/get_server_information_history");

const mongooseString = "mongodb+srv://opencmas:opencmas2020@opencmas.u51n3.mongodb.net/opencmas?retryWrites=true&w=majority";

mongoose.connect(mongooseString, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on("ERROR", function(error) {
  console.log(error)
})

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
})

app.use('/public', express.static('public'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'/public/html/login.html'))
});

app.get('/dashboard', function(req, res){
    res.sendFile(path.join(__dirname,'/public/html/dashboard.html'))
});

app.use("/get_server_information", get_server_information);
app.use("/get_server_information_history", get_server_information_history);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('*');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
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