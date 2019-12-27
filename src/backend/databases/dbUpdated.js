
// import mongoose package
const mongoose = require("mongoose");

// DB url
const dbUrl =
  "mongodb+srv://wasim:shan@cluster0-kossq.mongodb.net/MEAN?retryWrites=true&w=majority";
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true });

//   Get default connection object
const connection = mongoose.connection;

// funtion to intilize database and collection
const initDatabase = db => {
  // Check for "connected" Event
  connection.on("connected", () => {
    console.log(db, "Database connected Successfully...");
  });
  // Check for "disconnected" Event
  connection.on("disconnected", () => {
    console.log("Disconnected from DB");
  });
  // Check for "error" Event
  connection.on("error", err => {
    console.log("Error in connecting MEAN DB", err.reason);
  });
};

module.exports = {
  initDatabase
};
