const express = require("express");
// Create express routes
const userApp = express.Router();

const jwt = require("jsonwebtoken");

// import and init db and collection
const dbo = require("../databases/dbUpdated");
dbo.initDatabase("USER");

// body-parser
const bp = require("body-parser");
userApp.use(bp.json());

//Import bcrypt
const bcrypt = require("bcrypt");

// import product model (Schema)
const User = require("../models/users");

// TODO:FIXME: PHOTO UPLOAD ================================================================
// Multer import
const multer = require("multer");

// import cloudinary
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

// configuring cloudinary
cloudinary.config({
  cloud_name: "wasimkhan",
  api_key: "928417319282593",
  api_secret: "eqPsb8yk8e4CoB9fcZnKK6Ba1Pg"
});

// inform multer-storage-cloudinary to save photo to cloudinary
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "MEAN_Profile",
  allowedFormats: ["jpg", "png"],
  filename: function(req, file, cb) {
    cb(undefined, file.fieldname + "_" + Date.now());
  }
});

// Multer configure
let upload = multer({ storage: storage });

// Write USER request handler hare  ===============================================================

// TODO: POST request handler FIXME: Registration
userApp.post("/register", upload.single("photo"), (req, res) => {
  // get userObj from req.body and parse it to js object
  req.body = JSON.parse(req.body.userObj);
  // add photoURL property to req.body object by assigning image url
  req.body.photoURL = req.file.secure_url;

  User.findOne({ email: req.body.email })
    .exec()
    .then(userObj => {
      if (userObj === null) {
        //  Hashing passsword
        let password = req.body.password;
        bcrypt
          .hash(password, 8)
          .then(hashedPassword => {
            req.body.password = hashedPassword;
            // Create Product Document
            const userDoc = new User({
              name: req.body.name,
              email: req.body.email,
              photo: req.body.photo,
              mobile: req.body.mobile,
              qualification: req.body.qualification,
              password: req.body.password,
              photoURL: req.body.photoURL
            });
            userDoc
              .save()
              .then(() => {
                res.json({
                  message: `${req.body.name} is registered succesfully`,
                  isNotRegistered: true,
                  isRegistered: false
                });
              })
              .catch(err => {
                console.log(`error in Registering userDoc ${err}`);
              });
          })
          .catch(err => {
            console.log(`error in Hashing ${err}`);
          });
      } else {
        res.json({
          message: `${req.body.email} is already registered`,
          isNotRegistered: false,
          isRegistered: true
        });
      }
    })
    .catch(err => {
      console.log(`error in findOne duing Registration ${err}`);
    });
});

// TODO: POST request handler FIXME: LOGIN
userApp.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(userObj => {
      // invalid username
      if (userObj == null) {
        res.json({ message: "This email is not registered" });
      } else {
        bcrypt
          .compare(req.body.password, userObj.password)
          .then(result => {
            if (result == false) {
              // invalid password
              res.json({ message: "Invalid Password" });
            } else {
              // Using util promisifying jwt.sign()
              const util = require("util");
              const jwtSign = util.promisify(jwt.sign);
              // JWT token generation logic
              jwtSign({ email: userObj.email }, "abcde", { expiresIn: 3600 })
                .then(signedWebToken => {
                  res.json({
                    message: "Logged in successfully",
                    token: signedWebToken,
                    email: userObj.email,
                    expTime: Date.now() / 1000 + 3600
                  });
                })
                .catch(err => {
                  console.log(
                    `error in generating jwt token during Login ${err}`
                  );
                });
            }
          })
          .catch(err => {
            console.log(`error in Comparing Hashing duing Login ${err}`);
          });
      }
    })

    .catch(err => {
      console.log(`error in findOne duing Login ${err}`);
    });
});

// TODO: GET request handler FIXME: PROFILE
const verifyToken = require("../middlewares/verifyToken");
userApp.get("/:email/profile", verifyToken, (req, res) => {
  User.findOne({ email: req.params.email })
    .exec()
    .then(userObj => {
      res.json({ message: userObj });
    })
    .catch(err => {
      console.log(`error in findOne duing getting profile ${err}`);
    });
});

// TODO: PUT request handler FIXME: Photo Update

userApp.put("/profile/update", upload.single("photo"), (req, res) => {
  req.body = JSON.parse(req.body.userObj);
  User.updateOne(
    { email: req.body.email },
    {
      $set: {
        photoURL: req.file.secure_url
      }
    }
  )
    .exec()
    .then(() => {
      res.json({
        message: "Profile Photo Updated Successfully"
      });
    })
    .catch(err => {
      console.log(`error in Updating profile Picture ${err}`);
    });
});
// ===============================================================================

// export adminApp
module.exports = userApp;
