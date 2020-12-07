const express = require('express');
const mongoose = require("mongoose");
const Get_scripts = require("../models/get_scripts");
const router = express.Router();

router.post("/", (req, res, next) => {
    const get_scripts = new Get_scripts({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.script_name,
      description: req.body.script_description,
      icon_path: req.body.icon_path
    });
    get_scripts
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          script_inserted: "Successfull",
          createdProduct: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;
