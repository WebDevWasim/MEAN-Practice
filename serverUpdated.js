const express = require("express");
const app = express();

const morgan = require("morgan");

// TODO: Connecting server to angular app (dist)
const path = require("path");
app.use(express.static(path.join(__dirname, "./dist/MEAN")));

// import admin and user Apis
const adminUpdatedApi = require("./src/backend/apis/adminUpdatedApi");
const userUpdatedApi = require("./src/backend/apis/userUpdatedApi");

// forword the request based on path to admin or user Apis

app.use("/admin", adminUpdatedApi);
app.use("/user", userUpdatedApi);

// Morgan
app.use(morgan("dev"));

// Assign port no
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port no ${PORT}...`));
