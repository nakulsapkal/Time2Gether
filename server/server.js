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
		origin: "http://localhost:8002",
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

// Socket IO
const messageRouter = require("./routes/messages");
app.use("/api", messageRouter(db));

const conversationRouter = require("./routes/conversations");
app.use("/api", conversationRouter(db));

// connects, creates message, and emits top 10 messages
let users = [];

const addUser = (receiverId, socketId) => {
	console.log("users: Line 147 ", users);
	!users.some((user) => user.receiverId === receiverId) &&
		users.push({ receiverId, socketId });
};

const getUser = (userId) => {
	return users.find((user) => user.userId === userId);
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
	console.log("a user connected");
	io.emit("welcome", "Hello message from server!");

	socket.on("addUser", (userId) => {
		addUser(userId, socket.id);
		console.log("Users Array:", users);
		io.emit("getUsers", users);
	});

	socket.on(
		"sendMessage",
		(senderId, receiverId, content, conversationId, createdAt) => {
			console.log("Users: ", users);
			const user = getUser(receiverId);
			console.log("user: ", user, user.socketId, content);
			io.to(user.socketId).emit("getMessage", {
				senderId,
				content,
				conversationId,
				createdAt,
			});
		}
	);

	// close event when user disconnects from app
	socket.on("disconnect", () => {
		console.log("user disconnected");
		removeUser(socket.id);
		io.emit("guestUser", users);
	});
});

// Displays in terminal which port the socketPort is running on
server.listen(socketPort, () => {
	console.log(`listening on *:${socketPort}`);
});
// Socket IO END

app.listen(PORT, () => {
	console.log("Example app listening on port " + PORT);
});
