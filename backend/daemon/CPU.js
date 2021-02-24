function CPU(CPU_spec){

    var CPU_spec = {
        Architecture: "Amd",
        ByteOrder: "123",
        CPUs: 4,
        CoresPerSocket: 4,
        CpuMhz: 1800,
        CpuMin:1600,
        CpuMax: 2000
        
    }
    return CPU_spec;
 }
 module.exports = { CPU};