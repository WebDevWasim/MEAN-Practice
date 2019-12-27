// import mongoose
const mongoose = require("mongoose");

// Get schema object
const Schema = mongoose.Schema;

// Create Student schema
const studentSchema = new Schema({
  sno: Number,
  name: {
    type: String,
    lowercase: true
  },
  age: {
    type: Number,
    required: true
  }
});

// Export Model of above Schema
const studentModel = mongoose.model("Student", studentSchema);
module.exports = studentModel;
