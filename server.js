const express = require("express");
const app = express();

const morgan = require("morgan");

// TODO: Connecting server to angular app (dist)
const path = require("path");
app.use(express.static(path.join(__dirname, "./dist/MEAN")));

// import admin and user Apis
const adminApi = require("./src/backend/apis/adminApi");
const userApi = require("./src/backend/apis/userApi");
const albumApi = require("./src/backend/apis/albumApi");

// forword the request based on path to admin or user Apis
app.use("/album", albumApi);
app.use("/admin", adminApi);
app.use("/user", userApi);

// Morgan
app.use(morgan("dev"));

// Assign port no
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port no ${PORT}...`));
