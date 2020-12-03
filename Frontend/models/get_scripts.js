const mongoose = require('mongoose');

const get_scripts_schema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    name: String,
    description: String
  });
  

 module.exports = mongoose.model('get_scripts_model', get_scripts_schema, "scripts");