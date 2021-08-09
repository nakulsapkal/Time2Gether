// "use strict";

// require("dotenv").config();

// const db = require("./lib/db");
// const PORT = 8001;
// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const morgan = require("morgan");

// app.use(express.static("public"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// //create routes
// const userRouter = require("./routes/users");
// app.use("/api", userRouter(db));

// const businessUserRouter = require("./routes/business_users");
// app.use("/api", businessUserRouter(db));

// //passing the db instnace for quering the database
// const activityRouter = require("./routes/activities");
// app.use("/api", activityRouter(db));

// app.listen(PORT, () => {
//   console.log("Example app listening on port " + PORT);
// });

"use strict";

require("dotenv").config();

const db = require("./lib/db");
const PORT = 8001;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// Socket IO
const socketPort = 8003;
const { emit } = require("process");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:8002",
		methods: ["GET", "POST"],
	},
});
// Socket IO end

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// //Web Socket
// const webSocketsServerPort = 8004;
// const webSocketServer = require("websocket").server;
// const server = require("http").createServer(app);
// server.listen(webSocketsServerPort);
// console.log("listening on port 8004");
// const wsServer = new webSocketServer({
// 	httpServer: server,
// });

// const clients = {};

// // This code generates unique userid for everyuser.
// const getUniqueID = () => {
// 	const s4 = () =>
// 		Math.floor((1 + Math.random()) * 0x10000)
// 			.toString(16)
// 			.substring(1);
// 	return s4() + s4() + "-" + s4();
// };

// wsServer.on("request", function (request) {
// 	var userID = getUniqueID();
// 	console.log(
// 		new Date() +
// 			" Recieved a new connection from origin " +
// 			request.origin +
// 			"."
// 	);

// 	// You can rewrite this part of the code to accept only the requests from allowed origin
// 	const connection = request.accept(null, request.origin);
// 	clients[userID] = connection;
// 	console.log(
// 		"connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
// 	);

// 	connection.on("message", function (message) {
// 		if (message.type === "utf8") {
// 			console.log("Received Message: ", message.utf8Data);

// 			// broadcasting message to all connected clients
// 			for (key in clients) {
// 				clients[key].sendUTF(message.utf8Data);
// 				console.log("sent Message to: ", clients[key]);
// 			}
// 		}
// 	});
// });

// // Web Socket End

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
	// socket.on("chat message", (msg) => {
	// 	messageRouter(db)
	// 		.createSocketMessage(JSON.parse(msg))
	// 		.then((_) => {
	// 			emitMostRecentMessges();
	// 		})
	// 		.catch((err) => io.emit(err));

	// 	//socket.join(msg);
	// });
	io.emit("welcome", "Hello message from server!");
	socket.on("adduser", (receiverId) => {
		console.log("receiverId: ", receiverId);

		addUser(receiverId, socket.id);
		//io.emit("guestUsers", users);
	});

	socket.on("sendMessage", (senderId, receiverId, text) => {
		console.log("Users: ", users);
		const user = getUser(receiverId);
		io.to(user.socketId).emit("getMessage", { senderId, text });
	});

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

// const webSocketsServerPort = 8000;
// const webSocketServer = require('websocket').server;
// const http = require('http');

// // Spinning the http server and the websocket server.
// const server = http.createServer();
// server.listen(webSocketsServerPort);
// console.log('listening on port 8000');

// const wsServer = new webSocketServer({
//   httpServer: server
// });

// const clients = {};

// // This code generates unique userid for everyuser.
// const getUniqueID = () => {
//   const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
//   return s4() + s4() + '-' + s4();
// };

// wsServer.on('request', function (request) {
//   var userID = getUniqueID();
//   console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

//   // You can rewrite this part of the code to accept only the requests from allowed origin
//   const connection = request.accept(null, request.origin);
//   clients[userID] = connection;
//   console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

//   connection.on('message', function(message) {
//     if (message.type === 'utf8') {
//       console.log('Received Message: ', message.utf8Data);

//       // broadcasting message to all connected clients
//       for(key in clients) {
//         clients[key].sendUTF(message.utf8Data);
//         console.log('sent Message to: ', clients[key]);
//       }
//     }
//   })
// });
