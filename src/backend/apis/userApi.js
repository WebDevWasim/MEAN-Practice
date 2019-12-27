const express = require("express");
// Create express routes
const userApp = express.Router();

const jwt = require("jsonwebtoken");

// import and init db and collection
const dbo = require("../databases/db");
dbo.initDatabase("USER");

// body-parser
const bp = require("body-parser");
userApp.use(bp.json());

//Import bcrypt
const bcrypt = require("bcrypt");

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
  folder: "MEAN_Profile",
  allowedFormats: ["jpg", "png"],
  filename: function(req, file, cb) {
    cb(undefined, file.fieldname + "_" + Date.now());
  }
});

// TODO: Multer configure
let upload = multer({ storage: storage });

// Write USER request handler hare  ===============================================================
// TODO: POST request handler FIXME: Registration
userApp.post("/register", upload.single("photo"), (req, res, next) => {
  // get user collection
  let users = dbo.getDb()["usersCollection"];
  // get userObj from req.body and parse it to js object
  req.body = JSON.parse(req.body.userObj);
  // add photoURL property to req.body object by assigning image url
  req.body.photoURL = req.file.secure_url;
  users.findOne({ email: req.body.email }, (err, userData) => {
    if (err) {
      next(err);
    } else if (userData !== null) {
      res.json({
        message: `${req.body.email} is already registered`,
        isNotRegistered: false,
        isRegistered: true
      });
    } else {
      // TODO: Hashing passsword
      let password = req.body.password;
      bcrypt.hash(password, 8, (err, hashedPassword) => {
        if (err) {
          next(err);
        } else {
          req.body.password = hashedPassword;
          users.insertOne(req.body, (err, result) => {
            if (err) {
              next(err);
            } else {
              res.json({
                message: `${req.body.name} is registered succesfully`,
                isNotRegistered: true,
                isRegistered: false
              });
            }
          });
        }
      });
    }
  });
});

// TODO: POST request handler FIXME: LOGIN
userApp.post("/login", (req, res, next) => {
  // get user collection
  let users = dbo.getDb()["usersCollection"];
  users.findOne({ email: req.body.email }, (err, userObj) => {
    // if error
    if (err) {
      next(err);
    }
    // invalid username
    else if (userObj == null) {
      res.json({ message: "This email is not registered" });
    } else {
      bcrypt.compare(req.body.password, userObj.password, (err, result) => {
        if (err) {
          next(err);
        } else if (result == false) {
          // invalid password
          res.json({ message: "Invalid Password" });
        } else {
          // token generation logic

          jwt.sign(
            { email: userObj.email },
            "abcde",
            { expiresIn: "1h" },
            (err, signedWebToken) => {
              if (err) {
                next(err);
              } else {
                res.json({
                  message: "Logged in successfully",
                  token: signedWebToken,
                  email: userObj.email
                });
              }
            }
          );
        }
      });
    }
  });
});

// TODO: GET request handler FIXME: PROFILE
const verifyToken = require("../middlewares/verifyToken");
userApp.get("/profile/:email", verifyToken, (req, res, next) => {
  let users = dbo.getDb()["usersCollection"];
  users.findOne({ email: req.params.email }, (err, userObj) => {
    // if error
    if (err) {
      next(err);
    } else {
      res.json({ message: userObj });
    }
  });
});

// TODO: PUT request handler FIXME: Photo Update

userApp.put("/profile/update", upload.single("photo"), (req, res, next) => {
  let users = dbo.getDb()["usersCollection"];
  req.body = JSON.parse(req.body.userObj);
  users.updateOne(
    { email: req.body.email },
    {
      $set: {
        photoURL: req.file.secure_url
      }
    },
    (err, data) => {
      if (err) {
        next("error in photo update", err);
      } else {
        res.json({
          message: "Photo Updated Successfully"
        });
      }
    }
  );
});

// Error handling middleware
userApp.use((err, req, res, next) => {
  console.log("Error is", err.message);
});

// export adminApp
module.exports = userApp;
