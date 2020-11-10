const express = require('express');
const mongoose = require("mongoose");
const Static_information = require("../models/static_information");
const router = express.Router();

router.route("/").get(function (req, res) {
    console.log("static information request");
    Static_information.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;
