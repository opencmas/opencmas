
function CPU(){

    var CPU_spec = {
        Architecture: Arc,
        ByteOrder: ByteOr,
        CPUs: Cpus,
        VendorID: Vendor,
        CpuMhz: CpuMhz,
        CpuFam: CpuFam,
        ModelName: ModelName,
        UnixTime: Date.now().toString()
        
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
        UnixTime: Date.now().toString()
    
}
return Drive_spec;
}

function SYS(){

    var SYS_spec = {
    
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
            CpuUsageSys : CpuUsageSys,
            CpuUsageUser : CpuUsageUser,
            TaskTotal : TaskTotal,
            RunningTask : RunningTask,
            SleepingTask : SleepingTask,
            RAMFree : RAMFree,
            RAMUsed : RAMUsed,
            RAMTotal : RAMTotal,
            SwapFree : SwapFree,
            SwapTotal : SwapTotal,
            SwapUsed : SwapUsed,   
            RXTotal : RXTotal,
            TXTotal : TXTotal,
            InterfaceTotal : InterfaceTotal,
            UnixTime: Date.now().toString()
    }
    return SYS_spec;
    }

function KEY(){

    var KEY_spec = {
            
        firstUse : CurrentDate,
        publicKey: PuB          
        
    }
    return KEY_spec;
     }
            

 
 module.exports = { CPU, Drive, SYS , KEY};