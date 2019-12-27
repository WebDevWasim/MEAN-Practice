const express = require("express");
// Create express routes
const adminApp = express.Router();

const jwt = require("jsonwebtoken");

// import and init db and collection
const dbo = require("../databases/dbUpdated");
dbo.initDatabase("ADMIN");

// body-parser
const bp = require("body-parser");
adminApp.use(bp.json());

// Get Admin/User collection by importing
Admin = require("../models/admin");
User = require("../models/users");

// Write ADMIN request handler hare ==============================================
// TODO: ADMIN Login
adminApp.post("/login", (req, res) => {
  Admin.findOne({ email: req.body.email })
    .exec()
    .then(adminObj => {
      // invalid username
      if (adminObj == null) {
        res.json({ message: "This email is not registered" });
      } else {
        if (req.body.password !== adminObj.password) {
          // invalid password
          res.json({ message: "Invalid Password" });
        } else {
          // Using util promisifying jwt.sign()
          const util = require("util");
          const jwtSign = util.promisify(jwt.sign);
          // JWT token generation logic
          jwtSign({ email: adminObj.email }, "abcde", { expiresIn: "1h" })
            .then(signedWebToken => {
              res.json({
                message: "Admin login Successfully",
                token: signedWebToken,
                email: adminObj.email,
                expTime: Date.now() / 1000 + 3600
              });
            })
            .catch(err => {
              console.log(`error in generating jwt token during Login ${err}`);
            });
        }
      }
    })

    .catch(err => {
      console.log(`error in findOne duing Login ${err}`);
    });
});

// TODO: GET All users
adminApp.get("/admindashboard/users", (req, res, next) => {
  // get user collection

  User.find()
    .exec()
    .then(dataArray => {
      res.json({ dataArray });
    })
    .catch(err => {
      console.log(`error in find duing getting all users ${err}`);
    });
});

//TODO: DELETE User
adminApp.delete("/users/:email", (req, res, next) => {
  User.deleteOne({ email: req.params.email })
    .then(() => {
      res.json({
        message: `${req.params.email} is Deleted Successfully`
      });
    })
    .catch(err => {
      console.log("error in deleting user", err);
    });
});

//TODO: EDIT request handler FIXME: Retriving user data to modal
adminApp.get("/users/:email", (req, res, next) => {
  User.findOne({ email: req.params.email })
    .then(data => {
      res.json({
        userObj: data
      });
    })
    .catch(err => {
      console.log("error in getting data in edit user", err);
    });
});

//TODO: EDIT request handler FIXME: Updating user data
adminApp.put("/update/:email", (req, res, next) => {
  User.updateOne(
    { email: req.params.email },
    {
      $set: {
        name: req.body.name,
        mobile: req.body.mobile,
        qualification: req.body.qualification
      }
    }
  )
    .then(() => {
      res.json({
        message: "User Data Updated Successfully"
      });
    })
    .catch(err => {
      console.log("error in edit user", err);
    });
});

// export adminApp
module.exports = adminApp;
