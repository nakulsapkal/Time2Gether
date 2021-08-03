"use strict";

require("dotenv").config();

const db = require("./lib/db");
const PORT = 8001;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//create routes
const userRouter = require("./routes/users");
app.use("/api", userRouter(db));

//passing the db instnace for quering the database
const activityRouter = require("./routes/activities");
app.use("/api", activityRouter(db));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});