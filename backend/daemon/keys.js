
//function KEYgen(){

const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:40100/";
const sys_key = require("/opt/opencmas/backend/daemon/HW.js");
const childP = require('child_process');

var CurrentDate = null;
var PuB = null;

//const KeyGen = childP.execSync("ssh-keygen -f ./keys/key_id_rsa -t rsa -b 4096 -N '' -q");
const PublicKey = childP.execSync("cat ./keys/key_id_rsa.pub | awk '{print $2}'");
PuB = PublicKey.toString().replace(/(\r\n|\n|\r)/gm, "");



con(PuB);

function con(){


let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
CurrentDate = (year + "-" + month + "-" + date);

mongo.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db){
    if (err) throw err;
    var dbo = db.db("cmas");
    console.log("use cmas");
    this.PuB = PuB;
    this.CurrentDate = CurrentDate;
    

    var KEY_spec = sys_key.KEY(this.PuB, CurrentDate);
    console.log(KEY_spec);

    dbo.collection("static_information").insertOne(KEY_spec, function(err, res) {
     db.close();
      
    });        
  });

}



//}
//module.exports = {KEYgen};