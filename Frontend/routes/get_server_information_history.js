const express = require('express');
const mongoose = require("mongoose");
const Server_information_history = require("../models/server_information_history");
const router = express.Router();

router.route("/:date").get(function (req, res) {
    const date = req.params.date;
    console.log("uijhasgdfkujzhsdgf");
    Server_information_history.find({date: date}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.route("/").get(function (req, res) {

    Server_information_history.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;
