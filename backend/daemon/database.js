const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const { exec } = require("child_process");
const cpu_col = require("./CPU.js");


mongo.connect(url, function(err, db){
  if (err) throw err;
  var dbo = db.db("cmastest");


  var CPU_spec = cpu_col.CPU();


  dbo.collection("CPU2").insertOne(CPU_spec, function(err, res) {
   db.close();
    
  });
});


