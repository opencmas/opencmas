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
            ModelName: ModelName
            
        }
        return CPU_spec;
 }
 
 module.exports = { CPU};