const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const cpu_col = require("./CPU.js");
const childP = require('child_process');

const CPUinfo = childP.execSync("lscpu > temp/cpu.txt");

var Arc = null;
var ByteOr = null;
var Cpus = null;
var Vendor = null;
var CpuMhz = null;
var ModelName = null;

const Arcdata = childP.execSync("cat temp/cpu.txt | grep Arch | awk '{print $2}'");
Arc = Arcdata.toString().replace(/(\r\n|\n|\r)/gm, "");

const ByteOrdata = childP.execSync("cat temp/cpu.txt | grep 'Byte Order' | awk '{print $3$4}'");
ByteOr = ByteOrdata.toString().replace(/(\r\n|\n|\r)/gm, "");

const Cpusdata = childP.execSync("cat temp/cpu.txt | grep 'CPU(s)' | awk '{print $2}'");
Cpus = Cpusdata.toString().replace(/(\r\n|\n|\r)/gm, "");

const Vendordata = childP.execSync("cat temp/cpu.txt | grep 'Vendor ID' | awk '{print $3}'");
Vendor = Vendordata.toString().replace(/(\r\n|\n|\r)/gm, "");

const CpuMhzdata = childP.execSync("cat temp/cpu.txt | grep 'CPU MHz' | awk '{print $3}'");
CpuMhz = CpuMhzdata.toString().replace(/(\r\n|\n|\r)/gm, "");

const CpuFamdata = childP.execSync("cat temp/cpu.txt | grep 'CPU fam' | awk '{print $3}'");
CpuFam = CpuFamdata.toString().replace(/(\r\n|\n|\r)/gm, "");

const ModelNamedata = childP.execSync("cat temp/cpu.txt | grep 'Model name' | awk '{print $3$5$5$6$7$8$9$10}'");
ModelName = ModelNamedata.toString().replace(/(\r\n|\n|\r)/gm, "");


con(Arc, ByteOr, Cpus, Vendor, CpuMhz, CpuFam, ModelName);

  function con(){

      this.Arc = Arc;
      this.ByteOr = ByteOr;
      this.Cpus = Cpus;
      this.Vendor = Vendor;
      this.CpuMhz = CpuMhz;
      this.CpuFam = CpuFam;
      this.ModelName = ModelName;

      mongo.connect(url, function(err, db){
        if (err) throw err;
        var dbo = db.db("cmastest3");
    
        var CPU_spec = cpu_col.CPU(this.Arc, this.ByteOr, this.Cpus);
    
        dbo.collection("CPU").insertOne(CPU_spec, function(err, res) {
         db.close();
          
        });
        
      });
  }




