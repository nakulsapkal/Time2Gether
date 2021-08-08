"use strict";

require("dotenv").config();

const db = require("./lib/db");
const PORT = 8001;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");

const cors = require("cors");
const socketPort = 8003;
const { emit } = require("process");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
   cors: {
      origin: "http://localhost:8011",
      methods: ["GET", "POST"],
   },
});

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//create routes
const userRouter = require("./routes/users");
app.use("/api", userRouter(db));

const businessUserRouter = require("./routes/business_users");
app.use("/api", businessUserRouter(db));

//passing the db instnace for quering the database
const activityRouter = require("./routes/activities");
app.use("/api", activityRouter(db));

//for chat message
const messageRouter = require("./routes/messages");
app.use("/api", messageRouter(db));

const conversationRouter = require("./routes/conversations");
app.use("/api", conversationRouter(db));

app.listen(PORT, () => {
  console.log("Example app listening on socketPort " + socketPort);
});
