// Express
const express = require("express");
const albumApp = express.Router();

// import and init db and collection
const dbo = require("../databases/db");
dbo.initDatabase("ALBUM");

// body-parser
const bp = require("body-parser");
albumApp.use(bp.json());

// TODO:FIXME: PHOTO UPLOAD ================================================================
// TODO: Multer import
const multer = require("multer");

// TODO: import cloudinary
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

// TODO: configuring cloudinary
cloudinary.config({
  cloud_name: "wasimkhan",
  api_key: "928417319282593",
  api_secret: "eqPsb8yk8e4CoB9fcZnKK6Ba1Pg"
});

// TODO: inform multer-storage-cloudinary to save photo to cloudinary
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "Album",
  allowedFormats: ["jpg", "png"],
  filename: function(req, file, cb) {
    cb(undefined, file.fieldname + "_" + Date.now());
  }
});

// TODO: Multer configure
let upload = multer({ storage: storage });

// Write ALBUM request handler hare  ===============================================================
albumApp.post("/upload", upload.single("album"), (req, res, next) => {
  let album = dbo.getDb()["albumCollection"];
  req.body.photoURL = req.file.secure_url;

  album.insertOne(req.body, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.json({
        message: "Photo Uploaded Successfully"
      });
    }
  });
});
// ===================================
albumApp.get("/photos", (req, res, next) => {
  // get user collection
  let album = dbo.getDb()["albumCollection"];
  album.find().toArray((err, photoURLs) => {
    if (err) {
      next(err);
    } else {
      res.json({
        message: "Album Loaded Successfully",
        url: photoURLs
      });
    }
  });
});
// Error handling middleware ====================================================
albumApp.use((err, req, res, next) => {
  console.log("error is", err);
});

// export albumApp
module.exports = albumApp;
