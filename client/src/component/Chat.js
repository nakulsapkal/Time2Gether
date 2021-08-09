import React, { useRef, useContext } from "react";
import { stateContext } from "providers/StateProvider";
import { databaseContext } from "providers/DatabaseProvider";
import { useEffect } from "react";
//Socket IO
import socketClient from "socket.io-client";
const SERVER = "localhost:8003";
//let socket
export default function Chat() {
	const { room, setRoom } = stateContext;
	const { user } = useContext(databaseContext);
	const socket = useRef(socketClient(SERVER));

	const connectToRoom = () => {
		socket.emit("chat", room);
	};

	// useEffect(() => {
	// 	socket.current.emit("adduser", user.id);
	// 	socket.current.on("guestUser", (users) => {
	// 		console.log("Users to Server", users);
	// 	});
	// }, [user]);
	// useEffect(() => {
	// 	socket = socketClient(SERVER);
	// 	socket.on("welcome", (message) => {
	// 		console.log(message);
	// 	});
	// }, []);

	return (
		<div>
			<input type="text" placeholder="Name" />
			<input
				type="text"
				placeholder="Room"
				onChange={(event) => {
					setRoom(event.target.value);
				}}
			/>
			<button onClick={connectToRoom}>Enter Room</button>
		</div>
	);
}
