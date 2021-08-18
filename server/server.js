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

//creating multiple routes and passing the db instnace for quering the database
const userRouter = require("./routes/users");
app.use("/api", userRouter(db));

const businessUserRouter = require("./routes/business_users");
app.use("/api", businessUserRouter(db));

const activityRouter = require("./routes/activities");
app.use("/api", activityRouter(db));

const messageRouter = require("./routes/messages");
app.use("/api", messageRouter(db));

const conversationRouter = require("./routes/conversations");
app.use("/api", conversationRouter(db));

const promotionsRouter = require("./routes/promotions");
app.use("/api", promotionsRouter(db));

let users = [];

const addUser = (socketId, email, act_id) => {
	let userExists = users.find((u) => u.email === email);
	// console.log("userExists server.js:", userExists);
	if (userExists !== undefined) {
		users.map((u) => {
			if (u.email === email) {
				u.socketId = socketId;
			}
		});
		// console.log("users server.js 59:", users);

		return users.find((u) => u.email === email);
	} else {
		const user = { socketId, email, act_id };
		users.push(user);
		return user;
	}
};

const getUsersInRoom = (room) => users.filter((user) => user.act_id === room);

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id);

	if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (socketId) => users.find((user) => user.socketId === socketId);

// const addUser = (receiverId, socketId) => {
// 	!users.some((user) => user.receiverId === receiverId) &&
// 		users.push({ receiverId, socketId });
// };

// const getUser = (userId) => {
// 	return users.find((user) => user.receiverId === userId);
// };

// const removeUser = (socketId) => {
// 	users = users.filter((user) => user.socketId !== socketId);
// };

// io.on("connection", (socket) => {
// 	console.log("a user connected");
// 	io.emit("welcome", "Hello message from server!");

// 	socket.on("addUser", (userId) => {
// 		addUser(userId, socket.id);
// 		io.emit("getUsers", users);
// 	});

// 	socket.on("sendMessage", ({ receiverId, senderId, content }) => {
// 		const user = getUser(receiverId);
// 		io.to(user.socketId).emit("getMessage", {
// 			senderId,
// 			content,
// 		});
// 	});

io.on("connection", (socket) => {
	console.log("a user connected");
	io.emit("welcome", "Hello message from server!");

	socket.on("join", ({ user, room }) => {
		//console.log("User & Room Values:", user, room, socket.id);
		const newUser = addUser(socket.id, user.email, room.id);
		console.log("Users:", users);

		socket.join(newUser.act_id);
		// 			activity_id: 2
		// content: "hey"
		// created_at: "18/08/2021, 13:43:47"
		// id: 4
		// senderid: 1

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

		io.to(newUser.act_id).emit("roomData", {
			room: newUser.act_id,
			users: getUsersInRoom(newUser.act_id),
		});
	});

	socket.on("sendMessage", ({ newMessage }) => {
		const user = getUser(socket.id);
		console.log("Users:", users);
		// console.log("Socket ID:", socket.id);
		// console.log("newMessage*************:", newMessage);

		io.to(user.act_id).emit("message", newMessage);
	});

	socket.on("disconnect", () => {
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.act_id).emit("message", {
				senderemail: "Admin",
				content: `${user.email} has left.`,
				created_at: new Date().toLocaleString(),
				activity_id: newUser.act_id,
				senderid: 0,
			});
			io.to(user.act_id).emit("roomData", {
				room: user.act_id,
				users: getUsersInRoom(user.act_id),
			});
		}
	});

	// socket.on("addUser", (userId) => {
	// 	addUser(userId, socket.id);
	// 	io.emit("getUsers", users);
	// });

	// socket.on("sendMessage", ({ receiverId, senderId, content }) => {
	// 	const user = getUser(receiverId);
	// 	io.to(user.socketId).emit("getMessage", {
	// 		senderId,
	// 		content,
	// 	});
	// });

	// // close event when user disconnects from app
	// socket.on("disconnect", () => {
	// 	console.log("user disconnected");
	// 	removeUser(socket.id);
	// 	io.emit("guestUser", users);
	// });
});

// Displays in terminal which port the socketPort is running on
server.listen(socketPort, () => {
	console.log(`listening on *:${socketPort}`);
});

app.listen(PORT, () => {
	console.log("Example app listening on port " + PORT);
});
