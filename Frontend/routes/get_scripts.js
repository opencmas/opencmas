const express = require('express');
const mongoose = require("mongoose");
const Get_scripts = require("../models/script_model");
const router = express.Router();

router.route("/").get(function (req, res) {
    Get_scripts.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;
