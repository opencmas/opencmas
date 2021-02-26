function Netmon(){

    const mongo = require('mongodb').MongoClient;
    const url = "mongodb://localhost:27017/";
    const net_col = require("./HW.js");
    const childP = require('child_process');
    const{exec} = require('child_process');
    
    const NetInfo = childP.execSync("cat /proc/net/dev > temp/net.txt");
  
  
  var RXTotal = null;
  var TXTotal = null;
  var InterfaceTotal = null;
  
  
  const InterfaceTotaldata = childP.execSync("cat temp/net.txt | sed -n -e 3p  | awk '{print $1}'");
  InterfaceTotal = InterfaceTotaldata.toString().replace(/(\r\n|\n|\r)/gm, "");  

  const TXTotaldata = childP.execSync("cat temp/net.txt | sed -n -e 3p  | awk '{print $10}'");
  TXTotal = TXTotaldata.toString().replace(/(\r\n|\n|\r)/gm, "");

  const RXTotaldata = childP.execSync("cat temp/net.txt | sed -n -e 3p  | awk '{print $2}'");
  RXTotal = RXTotaldata.toString().replace(/(\r\n|\n|\r)/gm, "");

  con(RXTotal,TXTotal);
  
    function con(){
  
        
         this.RXTotal = Math.floor(RXTotal);
         this.TXTotal = Math.floor(TXTotal);

         
         if(this.RXTotal > 1000000)      
            this.RXTotal = (this.RXTotal/1000000 ).toString() + " MB";
         
         else if (this.RXTotal > 1000)
            this.RXTotal = (this.RXTotal /1000).toString() + " KB";
           
         if(this.TXTotal > 1000000)      
            this.TXTotal = (this.TXTotal/1000000 ).toString() + " MB";
         
         else if (this.TXTotal > 1000)
            this.TXTotal = (this.TXTotal /1000).toString() + " KB";
         


        
        mongo.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db){
          if (err) throw err;
          var dbo = db.db("cmastest11");
      
          var Network_spec = net_col.Network();
      
          dbo.collection("Network").insertOne(Network_spec, function(err, res) {
           db.close();
            
          });        
        });
    }
  }
module.exports = {Netmon};