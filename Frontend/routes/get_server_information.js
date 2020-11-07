const express = require('express');
const mongoose = require("mongoose");
const Server_information = require("../models/server_information");
const router = express.Router();

router.route("/").get(function (req, res) {
    Server_information.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;
