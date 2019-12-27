// import mongoose
const mongoose = require("mongoose");

// Get schema object
const Schema = mongoose.Schema;

// Create Student schema
const adminSchema = new Schema({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});

// Export Model of above Schema
const adminModel = mongoose.model("Admin", adminSchema);
module.exports = adminModel;
