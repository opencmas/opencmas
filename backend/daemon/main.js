const { Drivemon } = require("./databaseFileSystemMonitoring");
const { CPUmon } = require("./databaseResourceMonitoring");


    const callCPUmon = () => {
        CPUmon();
      };
      setInterval(callCPUmon, 4 * 1000);


    const callDrivemon = () => {
        Drivemon();
      };
      setInterval(callDrivemon, 4 * 1000);