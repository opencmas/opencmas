const express = require('express');
const mongoose = require("mongoose");
const Server_information_history = require("../models/server_information_history");
const Server_information = require("../models/server_information");
const router = express.Router();
const Promise = require('bluebird');

router.route("/:date").get(async function (req, res) {

    var epochToday = new Date();
    var requestedDate = new Date(req.params.date);
    //requestedDate = requestedDate.toLocaleString();
    
    //console.log(epochToday.getDate() + '/' +  (epochToday.getMonth() + 1) + '/' + epochToday.getFullYear());
    //console.log(requestedDate);
    var latest = 24;
    var server_information_history = [];
   
    //console.log(epochToday.getHours());
    //console.log(requestedDate.getDate());

    //console.log(epochToday.getMonth() + 1);
    //console.log(requestedDate.getMonth());

    if(epochToday.getDate() == requestedDate.getDate() && (epochToday.getMonth() + 1) == (requestedDate.getMonth() + 1) && epochToday.getFullYear() == requestedDate.getFullYear()){
        //console.log("i");
        latest = epochToday.getHours() + 1;       

    }     
    else 
        latest = 24;

  
   // var requestedDay = requestedDate.getDay();
    //var requestedHour = requestedDate.getHours();

   // let ret = await server_history_object.retrieveOne('{UnixTime: {$gt : "1615896000000"}}'); 
    //console.log(ret);

   var i = 0;
   console.log('Current hour ' + latest)
   while(i != latest){
       
       // requestedDate.setHours(i);
       //console.log("moin");
       //var date = new Date(requestedDate.getFullYear(), (requestedDate.getMonth + 1), requestedDate.getDate, i, 0, 0);
       var date = new Date(requestedDate.getFullYear(), requestedDate.getMonth(), requestedDate.getDate(), i, 0, 0);
       var date2 = new Date(requestedDate.getFullYear(), requestedDate.getMonth(), requestedDate.getDate(), i + 1, 0, 0);
       var epoch = Math.floor(date)
       var epoch2 = Math.floor(date2)

       console.log(epoch);
       console.log(i);

       var result = await Server_information.findOne({UnixTime: {$gt : epoch, $lt: epoch2}}).exec();
       var hour = "";
       if(i < 10)
       hour = "0" + i + ":00"
       else
       hour = i + ":00";

        try{
        //  console.log(result);
            var unixa = result.UnixTime;
            var id = result._id;
            var ramUsed = parseFloat(result.RAMUsed);
            var ramTotal = parseFloat(result.RAMTotal);
            var cpuUsageSys = parseFloat(result.CpuUsageSys);
            var cpuUsageUser = parseFloat(result.CpuUsageUser);
           

            var ramPercentage = (100 / ramTotal * ramUsed).toFixed(2);
            var cpuPercentage = cpuUsageSys + cpuUsageUser;
           
            console.log(ramUsed);

      

            var server_information_history_object = {id: id, hour: hour , ram: ramPercentage, cpu: cpuPercentage, drive: 0, network: 0, unix_: unixa };
            server_information_history.push(server_information_history_object);
        }
        catch{             
            var server_information_history_object = { hour: hour, ram: -1, cpu: -1, drive: -1, network: -1 };
            server_information_history.push(server_information_history_object);

        }
        
        console.log(i);
        i++;
        


    }

    console.log(server_information_history);
    if(i == latest){
        console.log("server_information_history");
        console.log(server_information_history);
        res.send(server_information_history);
    }

});

/*
const server_history_object = {
       retrieveOne: function(query) {
        return new Promise((resolve, reject) => {
          Server_information.findOne(query, function(err, result) {
             if (err) reject(err);
             resolve(result);
          });
        });
     }
  } 
*/
router.route("/").get(function (req, res) {
    console.log("No date requested");
    Server_information_history.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;
