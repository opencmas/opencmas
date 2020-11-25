const mongoose = require('mongoose');

const static_information_schema = new mongoose.Schema({
    firstUse: String, 
    publicKey: String
  });
  

 module.exports = mongoose.model('static_information_model', static_information_schema, "static_information");