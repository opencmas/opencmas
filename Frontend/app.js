const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();

const get_server_information = require("./routes/get_server_information");
const get_server_information_history = require("./routes/get_server_information_history");
const get_static_information = require("./routes/get_static_information");
const login = require("./routes/login");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
app.use("/get_static_information", get_static_information);
app.use("/login", login);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('*');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET', 'POST');
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