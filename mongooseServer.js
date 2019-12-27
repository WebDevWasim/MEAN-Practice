const express = require("express");
const app = express();

// Importing Apis
const studentApi = require("./src/backend/apis/studentApi");
const productApi = require("./src/backend/apis/productApi");

// Using routes Api
app.use("/student", studentApi);
app.use("/product", productApi);
// Listen to PORT
const PORT = 4000;
app.listen(PORT, () => {
  console.log("Mongoose server is working on ", PORT);
});
