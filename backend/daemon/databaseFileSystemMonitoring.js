function Drivemon(){

    const mongo = require('mongodb').MongoClient;
    const url = "mongodb://localhost:27017/";
    const drive_col = require("./HW.js");
    const childP = require('child_process');
    
  
  
  var Filesys = null;
  var Size = null;
  var Used = null;
  var UsedPer = null;
  var Free = null;
  var Mounted = null;
  
  
  const Filesysdata = childP.execSync("df -h | grep '/dev/' | sed -n -e 1p  |awk '{print $1}'");
  Filesys = Filesysdata.toString().replace(/(\r\n|\n|\r)/gm, "");

  const Sizesdata = childP.execSync("df -h | grep '/dev/' | sed -n -e 1p  |awk '{print $2}'");
  Size = Sizesdata.toString().replace(/(\r\n|\n|\r)/gm, "");
  
  const Useddata = childP.execSync("df -h | grep '/dev/' | sed -n -e 1p  |awk '{print $3}'");
  Used = Useddata.toString().replace(/(\r\n|\n|\r)/gm, "");
  
  const Freedata = childP.execSync("df -h | grep '/dev/' | sed -n -e 1p  |awk '{print $4}'");
  Free = Freedata.toString().replace(/(\r\n|\n|\r)/gm, "");

  const UsedPerdata = childP.execSync("df -h | grep '/dev/' | sed -n -e 1p  |awk '{print $5}'");
  UsedPer = UsedPerdata.toString().replace(/(\r\n|\n|\r)/gm, "");
  
  const Mounteddata = childP.execSync("df -h | grep '/dev/' | sed -n -e 1p  |awk '{print $6}'");
  Mounted = Mounteddata.toString().replace(/(\r\n|\n|\r)/gm, "");
  
  con(Filesys, Size, Used, Free, UsedPer, Mounted);
  
    function con(){
  
        
         this.Filesys =Filesys;
         this.Size = Size;
         this.Used = Used;
         this.UsedPer = UsedPer;
         this.Free = Free;
         this.Mounted = Mounted;
    
        mongo.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db){
          if (err) throw err;
          var dbo = db.db("cmastest5");
      
          var Drive_spec = drive_col.Drive();
      
          dbo.collection("Drive").insertOne(Drive_spec, function(err, res) {
           db.close();
            
          });        
        });
    }
  }
  module.exports = {Drivemon};