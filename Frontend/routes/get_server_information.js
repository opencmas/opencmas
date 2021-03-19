const express = require('express');
const mongoose = require("mongoose");
const Server_information = require("../models/server_information");
const router = express.Router();

router.route("/").get(function (req, res) {
    //Server_information.find({}).sort({_id:-1}).limit(1);
    //db.inventory.find( { qty: { $gt: 20 } } )

    //var w = Server_information.findOne({ unixTime: {$gt : 1614710973}});
    //Server_information.find({unixTime : {$gt : 1614710973}}, function (err, result){


    var epoch = Math.floor(new Date()) - 2000;     

    Server_information.findOne({UnixTime : {$gt : epoch}}, function (err, result) {
        if (err) {
            res.send(err);
            //console.log(Math.floor(+new Date() / 1000));
        } else {
            if(result == null){
                console.log("null");
                res.send(global.lastEntry);
                
            }       
            else{
                global.lastEntry = result;
                //console.log(global.lastEntry);
                // console.log(Math.floor(new Date()));
                //console.log("w");
                //console.log("Sys:" + result.CpuUsageSys)
                //console.log("User:" + result.CpuUsageUser)
                 res.send(result);
            }
        }
    });
});

module.exports = router;
