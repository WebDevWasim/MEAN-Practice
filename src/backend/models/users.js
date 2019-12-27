// import mongoose
const mongoose = require("mongoose");

// Get schema object
const Schema = mongoose.Schema;

// Create Student schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
    required: true
  }
});

// Export Model of above Schema
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
