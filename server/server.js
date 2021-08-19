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

//creating multiple routes and passing the db instnace for quering the database
const userRouter = require("./routes/users");
app.use("/api", userRouter(db));

const businessUserRouter = require("./routes/business_users");
app.use("/api", businessUserRouter(db));

const activityRouter = require("./routes/activities");
app.use("/api", activityRouter(db));

const messageRouter = require("./routes/messages");
app.use("/api", messageRouter(db));

const promotionsRouter = require("./routes/promotions");
app.use("/api", promotionsRouter(db));

let users = [];

//This function helps to store the users who are logged in app and also avoids multiple entries for any user as user can navigate to multiple activities
const addUser = (socketId, email, act_id, avatar) => {
	let userExists = users.find((u) => u.email === email);
	if (userExists !== undefined) {
		users.map((u) => {
			if (u.email === email) {
				u.socketId = socketId;
				u.act_id = act_id;
			}
		});

		return users.find((u) => u.email === email);
	} else {
		const user = { socketId, email, act_id, avatar };
		users.push(user);
		return user;
	}
};

//This function returns all the users in the same room
const getUsersInRoom = (room) => users.filter((user) => user.act_id === room);

//This function removes the user once logged out
const removeUser = (id) => {
	const index = users.findIndex((user) => user.socketId === id);

	if (index !== -1) return users.splice(index, 1)[0];
};

//This function returns the user for specific socketid
const getUser = (socketId) => users.find((user) => user.socketId === socketId);

io.on("connection", (socket) => {
	console.log("a user connected");
	io.emit("welcome", "Hello message from server!");

	//Join event listens for user to join the chat room of activity{ user(current user), room(activity.id and activity title) }
	socket.on("join", ({ user, room }) => {
		const newUser = addUser(socket.id, user.email, room.id, user.avatar);
		console.log("Users:", users);

		//user joins this specific room
		socket.join(newUser.act_id);

		//admin user emits messagess to chat room
		socket.emit("message", {
			senderemail: "admin",
			content: `${newUser.email}, welcome to room ${room.title}.`,
			created_at: new Date().toLocaleString(),
			activity_id: newUser.act_id,
			senderid: 0,
		});

		socket.broadcast.to(newUser.act_id).emit("message", {
			senderemail: "admin",
			content: `${newUser.email} has joined!`,
			created_at: new Date().toLocaleString(),
			activity_id: newUser.act_id,
			senderid: 0,
		});

		//all users currently logged are sent to all users
		io.to(newUser.act_id).emit("roomData", {
			room: newUser.act_id,
			users: getUsersInRoom(newUser.act_id),
		});
	});

	//sendMessage event for sending the messages from users to other users in chat room
	socket.on("sendMessage", ({ newMessage }) => {
		const user = getUser(socket.id);
		console.log("Users:", users);
		io.to(user.act_id).emit("message", newMessage);
	});

	//disconnect event once user logout
	socket.on("disconnect", () => {
		const user = removeUser(socket.id);
		console.log("user disconnected", user);

		if (user) {
			io.to(user.act_id).emit("message", {
				senderemail: "Admin",
				content: `${user.email} has left.`,
				created_at: new Date().toLocaleString(),
				activity_id: user.act_id,
				senderid: 0,
			});
			io.to(user.act_id).emit("roomData", {
				room: user.act_id,
				users: getUsersInRoom(user.act_id),
			});
		}
	});
});

// Displays in terminal which port the socketPort is running on
server.listen(socketPort, () => {
	console.log(`Time2Gether app socket listening on port:${socketPort}`);
});

app.listen(PORT, () => {
	console.log("Time2Gether app listening on port " + PORT);
});
