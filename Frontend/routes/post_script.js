const express = require('express');
const mongoose = require("mongoose");
const Get_scripts = require("../models/get_scripts");
const multer = require('multer');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

 

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === 'application/x-sh') 
      cb(null, path.join(__dirname, '../uploads/scripts'))
    else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
      cb(null, path.join(__dirname, '../uploads/icons'))
      
  },
  filename: function (req, file, cb) {
    if (file.mimetype === 'application/x-sh') 
      cb(null, file.fieldname + ".sh")
    else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
      cb(null, file.fieldname + ".png")
  }
})


var upload = multer({ storage : storage });

router.post("/", upload.fields([{ name: 'script_file', maxCount: 1}, { name: 'icon_path', maxCount: 1}]), function (req, res, next){
  const get_scripts = new Get_scripts({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.script_name,
      description: req.body.script_description,
      script_file: req.files.script_file[0].filename,
      script_icon: req.files.icon_path[0].filename
    });
    get_scripts
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
  });

module.exports = router;
