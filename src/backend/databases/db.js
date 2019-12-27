const dbUrl =
  "mongodb+srv://wasim:shan@cluster0-kossq.mongodb.net/test?retryWrites=true&w=majority";
const mc = require("mongodb").MongoClient;

let db;
let admins;
let users;
let exam;
let album;

// funtion to intilize database and collection
const initDatabase = api => {
  mc.connect(
    dbUrl,
    { useUnifiedTopology: true },
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        console.log("Error in database", err);
      } else {
        db = client.db("MEAN");
        admins = db.collection("admindata");
        users = db.collection("userdata");
        exam = db.collection("exam");
        album = db.collection("album");
        console.log(api, "db connected Successfully...");
      }
    }
  );
};

// to return database and collections objecta
const getDb = () => {
  return {
    adminsCollection: admins,
    usersCollection: users,
    examCollection: exam,
    albumCollection: album
  };
};

// export two funtions
module.exports = {
  initDatabase,
  getDb
};
