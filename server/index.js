"use strict";
var indexRouter = require("./routes/index");
require("dotenv").config();

const PORT = 8001;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);

db.connect(() => {
  console.log("connected to database");
});

app.use("/api", indexRouter(db)); // passing the db instnace for quering the database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
