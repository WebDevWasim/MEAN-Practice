const express = require("express");
const studentApp = express.Router();
// import and initilize database
const db = require("../databases/mongooseDB");
db.initDatabase("Student");

// import students model (Schema)
const Student = require("../models/students");

// import body parser
const bp = require("body-parser");
studentApp.use(bp.json());

// Request handler to save document to Mongoose/students collection
studentApp.post("/save", (req, res) => {
  // Create Student Documents before saving to db
  let studentDoc = new Student({
    sno: req.body.sno,
    name: req.body.name,
    age: req.body.age
  });
  console.log(studentDoc);
  studentDoc
    .save()
    .then(() => {
      res.json({
        message: "Student document inserted successsfully in the mongoose DB"
      });
    })
    .catch(err => {
      console.log("error in inserting studentDoc", err);
    });
});

module.exports = studentApp;
