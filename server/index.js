"use strict";

require("dotenv").config();

const db = require("./lib/db")
const PORT = 8001;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//create routes
const userRouter = require("./routes/users");
const activityRouter = require("./routes/activities");
const categoryRouter = require("./routes/categories");
const addressRouter = require("./routes/address");
//passing the db instnace for quering the database
app.use("/api", userRouter(db)); 
app.use("/api", activityRouter(db));
app.use("/api", categoryRouter(db));
app.use("/api", addressRouter(db));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
