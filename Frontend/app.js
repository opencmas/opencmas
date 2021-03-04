const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const Speakeasy = require("speakeasy");
const jwt = require('jsonwebtoken');
const app = express();

const get_server_information = require("./routes/get_server_information");
const get_server_information_history = require("./routes/get_server_information_history");
const get_static_information = require("./routes/get_static_information");
const login = require("./routes/login");
const get_scripts = require("./routes/get_scripts");
const post_script = require("./routes/post_script");
const checkauth = require('./middleware/check-auth');
const checkLogin = require('./middleware/check-login');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("dotenv").config();

const payload = {
    authentication: 'successfull',
    type: 'full-session'
  };

const myToken = jwt.sign(payload, 'secret', {
    algorithm: "HS256",
    expiresIn: '900000'
});


//const mongooseString = "mongodb+srv://opencmas:opencmas2020@opencmas.u51n3.mongodb.net/opencmas?retryWrites=true&w=majority";
const mongooseString = "mongodb://192.168.1.54:27017/cmastest11?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

mongoose.connect(mongooseString, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on("ERROR", function(error) {
  console.log(error)
})

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
})

app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'/public/html/login.html'))
});

app.get('/dashboard', checkauth, function(req, res){
    res.sendFile(path.join(__dirname,'/public/html/dashboard.html'))
});

app.get('/script_manager', checkauth, function(req, res){
    res.sendFile(path.join(__dirname,'/public/html/script_manager.html'))
});

app.get('/site_not_found', checkauth, function(req, res){
    res.sendFile(path.join(__dirname,'/public/html/site_not_found.html'))
});

app.get("/totp-generate-secret", checkauth, (request, response, next) => {
    var secret = Speakeasy.generateSecret({ length: 10 });
    response.send({ "secret": secret.base32 });
});

app.post("/totp-validate-dev", (req, res, next) => {
    //console.log(req.body.token);
    res.send({
        "valid": Speakeasy.totp.verify({
            secret: process.env.SECRET,
            encoding: "base32",
            token: req.body.token,
            window: 0
        })
    });
});

app.post("/totp-validate", checkLogin, (req, res, next) => {
    console.log(req.body);
    console.log("TOTP");
    const token = Speakeasy.totp.verify({
        secret: process.env.SECRET,
        encoding: "base32",
        token: req.body.token,
        window: 0
    })



    console.log(token);

    if(token == true){
        res.cookie('auth-cookie', myToken, { maxAge: 900000, domain: process.env.IP});
        res.end('END');
    }
    else{
        console.log("giadsa");
        res.send({ authentication: "failed" });

    }


});

app.use("/get_server_information", get_server_information);
app.use("/get_server_information_history", checkauth, get_server_information_history);
app.use("/get_static_information", get_static_information);
app.use("/login", login);
app.use("/get_scripts", get_scripts);
app.use("/post_script", post_script);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('*');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET', 'POST');
        return res.status(200).json({});
    }
    next();
});
 
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname,'/public/html/site_not_found.html'))
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