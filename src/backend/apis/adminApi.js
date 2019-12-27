const express = require("express");
// Create express routes
const adminApp = express.Router();

const jwt = require("jsonwebtoken");

// import and init db and collection
const dbo = require("../databases/db");
dbo.initDatabase("ADMIN");

// body-parser
const bp = require("body-parser");
adminApp.use(bp.json());

// Write ADMIN request handler hare ==============================================
adminApp.post("/login", (req, res, next) => {
  // get admin collection
  const admins = dbo.getDb()["adminsCollection"];

  admins.findOne({ email: req.body.email }, (err, adminObj) => {
    if (err) {
      next(err);
    } else if (adminObj == null) {
      res.json({ message: "This Email id is not registered" });
    } else {
      if (req.body.password !== adminObj.password) {
        res.json({ message: "Wrong Password" });
      } else {
        jwt.sign(
          { email: adminObj.email },
          "admin",
          { expiresIn: 60 },
          (err, signedToken) => {
            if (err) {
              next(err);
            } else {
              res.json({
                message: "Admin login Successfully",
                token: signedToken,
                email: adminObj.email
              });
            }
          }
        );
      }
    }
  });
});

// TODO: GET request handler
adminApp.get("/admindashboard/users", (req, res, next) => {
  // get user collection
  let users = dbo.getDb()["usersCollection"];
  users.find().toArray((err, dataArray) => {
    if (err) {
      next("Error in getting data ", err);
    }
    // else if (dataArray.length == 0) {
    //   res.json({ message: "No Registered User Available" });
    // }
    else {
      res.json({ dataArray });
    }
  });
});

//TODO: DELETE request handler
adminApp.delete("/users/:email", (req, res, next) => {
  let users = dbo.getDb()["usersCollection"];
  users.deleteOne({ email: req.params.email }, (err, data) => {
    if (err) {
      next("error in deleting user", err);
    } else {
      res.json({
        message: `${req.params.email} is Deleted Successfully`
      });
    }
  });
});

//TODO: EDIT request handler FIXME: Retriving user data to modal
adminApp.get("/users/:email", (req, res, next) => {
  let users = dbo.getDb()["usersCollection"];
  users.findOne({ email: req.params.email }, (err, data) => {
    if (err) {
      next("error in getting data in edit user", err);
    } else {
      res.json({
        userObj: data
      });
    }
  });
});

//TODO: EDIT request handler FIXME: Updating user data

adminApp.put("/update/:email", (req, res, next) => {
  let users = dbo.getDb()["usersCollection"];
  users.updateOne(
    { email: req.params.email },
    {
      $set: {
        name: req.body.name,
        mobile: req.body.mobile,
        qualification: req.body.qualification
      }
    },
    (err, data) => {
      if (err) {
        next("error in edit user", err);
      } else {
        res.json({
          message: "User Data Updated Successfully"
        });
      }
    }
  );
});

// Error handling middleware ====================================================
adminApp.use((err, req, res, next) => {
  console.log("error is", err);
});

// export adminApp
module.exports = adminApp;
