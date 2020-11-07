const mongoose = require('mongoose');

const server_information_schema = new mongoose.Schema({
    cpu: Number,
    ram: Number,
    drive: Number,
    network: Number
  });
  

 module.exports = mongoose.model('server_information_model', server_information_schema, "server_information");