function Processmon(){

    const mongo = require('mongodb').MongoClient;
    const url = "mongodb://localhost:27017/";
    const pid_col = require("./HW.js");
    const childP = require('child_process');
    
    const PIDInfo = childP.execSync("top -n 1 -b > temp/pid.txt");


  var CpuUsageSys = null;
  var CpuUsageUser = null;
  var TaskTotal = null;
  var RunningTask = null;
  var SleepingTask = null;
  var RAMTotal = null;
  var RAMUsed = null;
  var RAMFree = null;
  var SwapTotal = null;
  var SwapUsed= null;
  var SwapFree = null;

  var PID1, PID2, PID3, PID4, PID5, PID6, PID7, PID8, PID9, PID10, PID11, PID12, PID13, PID14, PID15 = null;
 

  const CpuUsageSysdata = childP.execSync("cat temp/pid.txt | grep %Cpu | awk '{print $4}'");
  CpuUsageSys = CpuUsageSysdata.toString().replace(/(\r\n|\n|\r)/gm, "");

  const CpuUsageUserdata = childP.execSync("cat temp/pid.txt | grep %Cpu | awk '{print $2}'");
  CpuUsageUser = CpuUsageUserdata.toString().replace(/(\r\n|\n|\r)/gm, "");

  const TaskTotaldata = childP.execSync("cat temp/pid.txt | grep Tasks | awk '{print $2}'");
  TaskTotal = TaskTotaldata.toString().replace(/(\r\n|\n|\r)/gm, "");

  const RunningTaskdata = childP.execSync("cat temp/pid.txt | grep Tasks | awk '{print $4}'");
  RunningTask = RunningTaskdata.toString().replace(/(\r\n|\n|\r)/gm, "");

  const SleepingTaskdata = childP.execSync("cat temp/pid.txt | grep Tasks | awk '{print $6}'");
  SleepingTask = SleepingTaskdata.toString().replace(/(\r\n|\n|\r)/gm, "");

  const RAMTotaldata = childP.execSync("cat temp/pid.txt | grep 'MiB Mem' | awk '{print $4}'");
  RAMTotal = RAMTotaldata.toString().replace(/(\r\n|\n|\r)/gm, "");

  const RAMUseddata = childP.execSync("cat temp/pid.txt | grep 'MiB Mem' | awk '{print $8}'");
  RAMUsed = RAMUseddata.toString().replace(/(\r\n|\n|\r)/gm, "");

  const RAMFreedata = childP.execSync("cat temp/pid.txt | grep 'MiB Mem' | awk '{print $6}'");
  RAMFree = RAMFreedata.toString().replace(/(\r\n|\n|\r)/gm, "");

  const SwapTotaldata = childP.execSync("cat temp/pid.txt | grep 'MiB Swap' | awk '{print $3}'");
  SwapTotal = SwapTotaldata.toString().replace(/(\r\n|\n|\r)/gm, "");

  const SwapUseddata = childP.execSync("cat temp/pid.txt | grep 'MiB Swap' | awk '{print $7}'");
  SwapUsed = SwapUseddata.toString().replace(/(\r\n|\n|\r)/gm, "");

  const SwapFreedata = childP.execSync("cat temp/pid.txt | grep 'MiB Swap' | awk '{print $5}'");
  SwapFree = SwapFreedata.toString().replace(/(\r\n|\n|\r)/gm, "");



  const PID1data = childP.execSync("cat temp/pid.txt | sed -n -e 8p ");
  PID1 = PID1data.toString().replace(/(\r\n|\n|\r)/gm, "");

  const PID2data = childP.execSync("cat temp/pid.txt | sed -n -e 9p ");
  PID2 = PID2data.toString().replace(/(\r\n|\n|\r)/gm, "");

  const PID3data = childP.execSync("cat temp/pid.txt | sed -n -e 10p ");
  PID3 = PID3data.toString().replace(/(\r\n|\n|\r)/gm, "");

  const PID4data = childP.execSync("cat temp/pid.txt | sed -n -e 11p ");
  PID4 = PID4data.toString().replace(/(\r\n|\n|\r)/gm, "");

  const PID5data = childP.execSync("cat temp/pid.txt | sed -n -e 12p ");
  PID5 = PID5data.toString().replace(/(\r\n|\n|\r)/gm, "");

  const PID6data = childP.execSync("cat temp/pid.txt | sed -n -e 13p ");
  PID6 = PID6data.toString().replace(/(\r\n|\n|\r)/gm, "");

  const PID7data = childP.execSync("cat temp/pid.txt | sed -n -e 14p ");
  PID7 = PID7data.toString().replace(/(\r\n|\n|\r)/gm, "");

  const PID8data = childP.execSync("cat temp/pid.txt | sed -n -e 15p ");
  PID8 = PID8data.toString().replace(/(\r\n|\n|\r)/gm, "");

  const PID9data = childP.execSync("cat temp/pid.txt | sed -n -e 16p ");
  PID9 = PID9data.toString().replace(/(\r\n|\n|\r)/gm, "");

  const PID10data = childP.execSync("cat temp/pid.txt | sed -n -e 17p ");
  PID10 = PID10data.toString().replace(/(\r\n|\n|\r)/gm, "");

  const PID11data = childP.execSync("cat temp/pid.txt | sed -n -e 18p ");
  PID11 = PID11data.toString().replace(/(\r\n|\n|\r)/gm, "");

  const PID12data = childP.execSync("cat temp/pid.txt | sed -n -e 19p ");
  PID12 = PID12data.toString().replace(/(\r\n|\n|\r)/gm, "");

  const PID13data = childP.execSync("cat temp/pid.txt | sed -n -e 20p ");
  PID13 = PID13data.toString().replace(/(\r\n|\n|\r)/gm, "");

  const PID14data = childP.execSync("cat temp/pid.txt | sed -n -e 21p ");
  PID14 = PID14data.toString().replace(/(\r\n|\n|\r)/gm, "");

  const PID15data = childP.execSync("cat temp/pid.txt | sed -n -e 22p ");
  PID15 = PID15data.toString().replace(/(\r\n|\n|\r)/gm, "");


  con(PID1, PID2, PID3, PID4 ,PID5, PID6, PID7, PID8, PID9, PID10, PID11, PID12, PID13, PID14, PID15, CpuUsageSys, CpuUsageUser, TaskTotal, RunningTask, SleepingTask, RAMFree, RAMUsed, RAMTotal, SwapTotal, SwapFree, SwapUsed);
  
    function con(){
  
        
         this.PID1 = PID1;
         this.PID2 = PID2;
         this.PID3 = PID3;
         this.PID4 = PID4;
         this.PID5 = PID5;
         this.PID6 = PID6;
         this.PID7 = PID7;
         this.PID8 = PID8;
         this.PID9 = PID9;
         this.PID10 = PID10;
         this.PID11 = PID11;
         this.PID12 = PID12;
         this.PID13 = PID13;
         this.PID14 = PID14;
         this.PID15 = PID15;
         this.CpuUsageSys = CpuUsageSys;
         this.CpuUsageUser = CpuUsageUser;
         this.TaskTotal= TaskTotal;
         this.RunningTask= RunningTask;
         this.SleepingTask= SleepingTask;
         this.RAMFree = RAMFree;
         this.RAMUsed = RAMUsed;
         this.RAMTotal= RAMTotal;
         this.SwapFree = SwapFree;
         this.SwapTotal = SwapTotal;
         this.SwapUsed = SwapUsed;
       
         
    
        mongo.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err, db){
          if (err) throw err;
          var dbo = db.db("cmastest6");
      
          var Pid_spec = pid_col.PID();
      
          dbo.collection("PID").insertOne(Pid_spec, function(err, res) {
           db.close();
            
          });        
        });
    }
  }
  module.exports = {Processmon};