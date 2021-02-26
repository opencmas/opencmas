const { Drivemon } = require("./databaseFileSystemMonitoring");
const { Netmon } = require("./databaseNetworkMonitoring");
const { Processmon } = require("./databaseProcessMonitoring");
const { CPUmon } = require("./databaseResourceMonitoring");


    const callCPUmon = () => {
        CPUmon();
      };
      setInterval(callCPUmon, 86400 * 1000);


    const callDrivemon = () => {
        Drivemon();
      };
      setInterval(callDrivemon, 86400 * 1000);

    const callProcessmon = () => {
        Processmon();
        Netmon();
      };
      setInterval(callProcessmon, 2000);