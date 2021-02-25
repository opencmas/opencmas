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
 
 module.exports = { CPU, Drive};