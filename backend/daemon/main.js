const { Drivemon } = require("./databaseFileSystemMonitoring");
const { Systemmon } = require("./databaseSystemMonitoring");
const { CPUmon } = require("./databaseResourceMonitoring");


var active = 0;

if (active == 0)
{
  active = 1;
  CPUmon();
  Drivemon();
}


    const callCPUmon = () => {
        CPUmon();
      };
      setInterval(callCPUmon, 86400 * 1000);


    const callDrivemon = () => {
        Drivemon();
      };
      setInterval(callDrivemon, 86400 * 1000);

    const callSystemmon = () => {
      Systemmon();
      };
      setInterval(callSystemmon, 2000);