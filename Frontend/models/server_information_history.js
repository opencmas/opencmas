const mongoose = require('mongoose');

const server_information_history_schema = new mongoose.Schema({
    date: String,
    hour: String,
    cpu: String,
    ram: String,
    drive: String,
    network: String
  });
  

 module.exports = mongoose.model('server_information_history_model', server_information_history_schema, "server_information_history");