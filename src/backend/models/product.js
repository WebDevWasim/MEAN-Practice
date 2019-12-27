// import mongoose
const mongoose = require("mongoose");

// Get schema object
const Schema = mongoose.Schema;

// Create Student schema
const productSchema = new Schema({
  productId: {
    type: Number,
    required: true
  },
  productName: {
    type: String,
    minlength: 1
  },
  price: {
    type: Number,
    required: true
  },
  modelNo: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true
  }
});

// Export Model of above Schema
const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
