const mongoose = require('mongoose');

const server_information_history_schema = new mongoose.Schema({
  PID1: String,
  PID2: String,
  PID3: String,
  PID4: String,
  PID5: String,
  PID6: String,
  PID7: String,
  PID8: String,
  PID9: String,
  PID10: String,
  PID11: String,
  PID12: String,
  PID13: String,
  PID14: String,
  PID15: String,
  CpuUsageSys : String,
  CpuUsageUser : String,
  TaskTotal : String,
  RunningTask: String,
  SleepingTask: String,
  RAMFree: String,
  RAMUsed: String,
  RAMTotal: String,
  SwapFree: String,
  SwapTotal: String,
  SwapUsed: String,
  RXTotal: String,
  TXTotal: String,
  InterfaceTotal: String,
  UnixTime: String
  });
  

 module.exports = mongoose.model('server_information_history_model', server_information_history_schema, "SYS");