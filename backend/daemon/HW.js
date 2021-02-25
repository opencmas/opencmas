const { exec } = require("child_process");
const { Console } = require("console");


function CPU(){

    var CPU_spec = {
        Architecture: Arc,
        ByteOrder: ByteOr,
        CPUs: Cpus,
        VendorID: Vendor,
        CpuMhz: CpuMhz,
        CpuFam: CpuFam,
        ModelName: ModelName,
        unixTime: Date.now()
        
    }
return CPU_spec;
 }

function Drive(){

var Drive_spec = {

        Filesystem : Filesys,
        Size : Size,
        Used : Used,
        UsedPer : UsedPer,
        Free : Free,
        Mounted : Mounted,
        unixTime: Date.now()
    
}
return Drive_spec;
}

function PID(){

    var PID_spec = {
    
            PID1 : PID1,
            PID2 : PID2,
            PID3 : PID3,
            PID4 : PID4,
            PID5 : PID5,
            PID6 : PID6,
            PID7 : PID7,
            PID8 : PID8,
            PID9 : PID9,
            PID10 : PID10,
            PID11 : PID11,
            PID12 : PID12,
            PID13 : PID13,
            PID14 : PID14,
            PID15 : PID15,
            CpuUsageSys : CpuUsageSys + " %",
            CpuUsageUser : CpuUsageUser + " %",
            TaskTotal : TaskTotal,
            RunningTask : RunningTask,
            SleepingTask : SleepingTask,
            RAMFree : RAMFree,
            RAMUsed : RAMUsed,
            RAMTotal : RAMTotal,
            SwapFree : SwapFree,
            SwapTotal : SwapTotal,
            SwapUsed : SwapUsed,
            unixTime: Date.now()
        
    }
    return PID_spec;
    }


 
 module.exports = { CPU, Drive, PID};