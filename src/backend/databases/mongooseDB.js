// import mongoose package
const mongoose = require("mongoose");

// DB url
const dbUrl =
  "mongodb+srv://shan:shan@cluster0-kossq.mongodb.net/Mongoose?retryWrites=true&w=majority";
mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true });

//   Get default connection object
const connection = mongoose.connection;

// funtion to intilize database and collection
const initDatabase = db => {
  //TODO: connect to mongo database
  /* 
// Simple way of connecting Mongo Db
mongoose
  .connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Mongoose DB connected Successfully");
  })
  .catch(err => {
    console.log("Error in connecting Database:", err);
  });
*/

  // FIXME: Tracking every event at the time of connecting Database (Connecting Mongo Db)

  // =========== CHECK FOR EVENTS ================= //
  // Check for "connected" Event
  connection.on("connected", () => {
    console.log(db, "DB connected Successfully...");
  });
  // Check for "disconnected" Event
  connection.on("disconnected", () => {
    console.log("Disconnected from DB");
  });
  // Check for "error" Event
  connection.on("error", err => {
    console.log("Error in connecting Mongoose DB", err.reason);
  });
};

module.exports = {
  initDatabase
};
