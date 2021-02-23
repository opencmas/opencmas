const express = require('express');
const mongoose = require("mongoose");
const Script_Model = require("../models/script_model");
const multer = require('multer');
const router = express.Router();
const path = require('path');
const fs = require('fs');
var scriptName = "";
var iconName = "";
var id = new mongoose.Types.ObjectId();

 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === 'application/x-sh') 
      cb(null, path.join(__dirname, '../uploads/scripts'))
    else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
      cb(null, path.join(__dirname, '../uploads/icons'))
      
  },
  filename: function (req, file, cb) {
    if (file.mimetype === 'application/x-sh') {
      scriptName = id + "_script.sh";
      cb(null, scriptName)
    }
    else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      iconName = id + "_icon.png";
      cb(null, iconName)
    }
  }
})

var upload = multer({ storage : storage });

router.post("/", upload.fields([{ name: 'script_file', maxCount: 1}, { name: 'icon_path', maxCount: 1}]), function (req, res, next){
  
  console.log(req.body)
  const script = new Script_Model({
      _id: id,
      name: req.body.script_name,
      description: req.body.script_description,
      script_file: id + '_script.sh',
      script_icon: id + '_icon.png'
    });
    script
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          script_inserted: "Successfull"});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });

      id = new mongoose.Types.ObjectId();
  });

module.exports = router;