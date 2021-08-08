// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

// var app = express();

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// module.exports = app;

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
		origin: "http://localhost:8001",
		methods: ["GET", "POST"],
	},
});

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
//create routes
const userRouter = require("./routes/users");
app.use("/api", userRouter(db));

const businessUserRouter = require("./routes/business_users");
app.use("/api", businessUserRouter(db));

//passing the db instnace for quering the database
const activityRouter = require("./routes/activities");
app.use("/api", activityRouter(db));

const messageRouter = require("./routes/messages");
app.use("/api/messages", messageRouter(db));
//app.get("/api", messageRouter(db).getMessages);
//app.post("/api", messageRouter(db).createMessage);

// sends out the 10 most recent messages from recent to old
const emitMostRecentMessges = () => {
	messageRouter(db)
		.getSocketMessages()
		.then((result) => io.emit("chat message", result))
		.catch(console.log);
};
// connects, creates message, and emits top 10 messages
io.on("connection", (socket) => {
	console.log("a user connected");
	socket.on("chat message", (msg) => {
		messageRouter(db)
			.createSocketMessage(JSON.parse(msg))
			.then((_) => {
				emitMostRecentMessges();
			})
			.catch((err) => io.emit(err));
	});

	// close event when user disconnects from app
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

// Displays in terminal which port the socketPort is running on
server.listen(socketPort, () => {
	console.log(`listening on *:${socketPort}`);
});

app.listen(PORT, () => {
	console.log("Example app listening on port " + PORT);
});
