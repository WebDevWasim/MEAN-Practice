const express = require("express");
const productApp = express.Router();
// import and initilize database
const db = require("../databases/mongooseDB");
db.initDatabase("Product");

// import product model (Schema)
const Product = require("../models/product");

// import body parser
const bp = require("body-parser");
productApp.use(bp.json());

// Request handler to save document to Mongoose/students collection
// TODO: Save Product =====================================
productApp.post("/saveproduct", (req, res) => {
  Product.findOne({ productId: req.body.productId })
    .exec()
    .then(productObj => {
      if (productObj === null) {
        // Create Product Document
        const productDoc = new Product({
          productId: req.body.productId,
          productName: req.body.productName.toLocaleLowerCase(),
          price: req.body.price,
          modelNo: req.body.modelNo,
          brand: req.body.brand.toLocaleLowerCase()
        });
        productDoc
          .save()
          .then(() => {
            res.json({
              message: `${req.body.productName} saved Successfully in the database`
            });
          })
          .catch(err => {
            res.json({
              message: `error in saving studentDoc ${err}`
            });
          });
      } else {
        res.json({
          message: `Product ID ${req.body.productId} is already Exist`
        });
      }
    })
    .catch(err => {
      res.json({
        message: `error in Posting products ${err}`
      });
    });
});

// TODO: Get Product Details =====================================
productApp.get("/getallproducts", (req, res) => {
  Product.find()
    .exec()
    .then(products => {
      if (products === null) {
        res.json({
          message: `No Product Avialiable`
        });
      } else {
        res.json({
          message: products
        });
      }
    })
    .catch(err => {
      res.json({
        message: `error in Geting products ${err}`
      });
    });
});

// TODO: Get Product Details by productId =====================================
productApp.get("/productId/:productId", (req, res) => {
  Product.findOne({ productId: req.params.productId })
    .exec()
    .then(product => {
      if (product === null) {
        res.json({
          message: `Product ID ${req.params.productId} is not Avialiable`
        });
      } else {
        res.json({
          message: product
        });
      }
    })
    .catch(err => {
      res.json({
        message: `error in Geting product Id ${req.params.productId} ${err}`
      });
    });
});

// TODO: Get Product Details by productName =====================================
productApp.get("/productName/:productName", (req, res) => {
  Product.findOne({ productName: req.params.productName.toLocaleLowerCase() })
    .exec()
    .then(product => {
      if (product === null) {
        res.json({
          message: `Product Name ${req.params.productName} is not Avialiable`
        });
      } else {
        res.json({
          message: product
        });
      }
    })
    .catch(err => {
      res.json({
        message: `error in Geting product Name ${req.params.productName} ${err}`
      });
    });
});

// TODO: DELETE Product by productId =====================================
productApp.delete("/deleteProduct/productId/:productId", (req, res) => {
  Product.findOne({ productId: req.params.productId })
    .exec()
    .then(productObj => {
      if (productObj === null) {
        res.json({
          message: `Product ID ${req.params.productId} is not Exist`
        });
      } else {
        Product.deleteOne({ productId: req.params.productId })
          .exec()
          .then(() => {
            res.json({
              message: `Product Id ${req.params.productId} is Deleted Successfully`
            });
          })
          .catch(err => {
            res.json({
              message: `error in Deleting product Id ${req.params.productId} ${err}`
            });
          });
      }
    });
});

// TODO: UPDATE Product by productId =====================================
productApp.put("/update", (req, res) => {
  Product.findOne({ productId: req.body.productId })
    .exec()
    .then(productObj => {
      if (productObj === null) {
        res.json({
          message: `Product ID ${req.body.productId} is not Exist`
        });
      } else {
        Product.updateOne(
          { productId: req.body.productId },
          {
            $set: {
              productId: req.body.productId,
              productName: req.body.productName.toLocaleLowerCase(),
              price: req.body.price,
              modelNo: req.body.modelNo,
              brand: req.body.brand.toLocaleLowerCase()
            }
          }
        )

          .then(() => {
            res.json({
              message: `Product ID ${req.body.productId} Updated Successfully`
            });
          })
          .catch(err => {
            res.json({
              message: `error in Updating studentDoc ${err}`
            });
          });
      }
    })
    .catch(err => {
      res.json({
        message: `error in Putting products ${err}`
      });
    });
});

// Exporting Product Api
module.exports = productApp;
