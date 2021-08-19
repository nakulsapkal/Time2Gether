import React, { useState, useEffect, useContext, useRef } from "react";
import { stateContext } from "providers/StateProvider";
import { databaseContext } from "providers/DatabaseProvider";
import "./Message.css";
import axios from "axios";

//Socket IO
import socketClient from "socket.io-client";

export default function Message() {
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [loggedInUsers, setLoggedInUsers] = useState("");
	const { user } = useContext(databaseContext);
	const { activity } = useContext(stateContext);
	const socket = useRef();

	//Scroll view for messages
	const messagesRef = useRef(null);
	const scrollToBottom = () => {
		messagesRef.current.scrollIntoView({
			behavior: "smooth",
		});
	};

	let { id, title } = activity[0];
	//This useEffect does socket connection and also joins the activity room for the user
	useEffect(() => {
		socket.current = socketClient("ws://localhost:8003");
		let room = { id, title };
		socket.current.emit("join", { user, room });
	}, [id, user]);

	//This useEffect fetches new messaged from server and the renders that new message for the user and also fetches all the users for that same activity(i.e roomdata)
	useEffect(() => {
		socket.current.on("message", (message) => {
			setMessages((messages) => [...messages, message]);
		});

		socket.current.on("roomData", ({ users }) => {
			setLoggedInUsers(users);
		});
	}, []);

	//This useEffect fetches all messages from DB(history for acitivty chat room) once user navigates to new history
	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get("/api/messages/" + id);
				setMessages(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getMessages();
	}, [id]);

	let hide = {
		display: "none",
	};
	let show = {
		display: "block",
	};

	const [chatopen, setChatopen] = useState(false);
	const toggle = (e) => {
		setChatopen(!chatopen);
	};

	const chatTxt = React.createRef();

	const sendChat = async (e) => {
		e.preventDefault();

		//preparing the new message structure for DB
		const messageToDB = {
			senderid: user.id,
			content: newMessage,
			activity_id: id,
			created_at: new Date().toLocaleString(),
			senderemail: user.email,
		};

		try {
			const res = await axios.post("/api/messages/create", messageToDB);
			messages.push(res.data[0]);
			setMessages([...messages]);
			setNewMessage("");
		} catch (err) {
			console.log(err);
		}

		//sending the message to other users in chat room
		socket.current.emit("sendMessage", {
			newMessage: messageToDB,
		});

		setNewMessage("");
	};

	//this is being used for handling the scroll
	useEffect(() => {
		if (messagesRef.current) {
			scrollToBottom();
		}
	}, [messagesRef]);
	return (
		<div id="chatCon">
			<div className="pop">
				<p>
					<img
						onClick={toggle}
						src="https://p7.hiclipart.com/preview/151/758/442/iphone-imessage-messages-logo-computer-icons-message.jpg"
						alt=""
					/>
				</p>
			</div>
			<div className="chat-box" style={chatopen ? show : hide}>
				<div className="chat-header">
					<div className="user-list">
						{loggedInUsers ? (
							loggedInUsers.map((u) => {
								return <img className="avatar" src={u.avatar} alt="img" />;
							})
						) : (
							<span className="noConversationText">No one online.</span>
						)}
					</div>
				</div>
				<div className="chat-container">
					<div className="chat-list">
						{messages ? (
							messages.map((msg) => {
								const message = msg && (
									<div
										ref={messagesRef}
										key={msg.created_at}
										className={`chat-message ${msg.senderId}`}
									>
										<div className="message-text">{msg.content}</div>

										<div className="timestamp">{msg && msg.created_at}</div>
										<div className="timestamp">{msg && msg.senderemail}</div>
									</div>
								);
								return <div>{message}</div>;
							})
						) : (
							<span className="noConversationText">
								Start a fresh conversation.
							</span>
						)}
					</div>
					<form className="chat-controls" onSubmit={(e) => e.preventDefault()}>
						<input
							onChange={(e) => setNewMessage(e.target.value)}
							ref={chatTxt}
							value={newMessage}
							placeholder="Type message here.."
						/>
						<button id="chat-send-button" onClick={sendChat}>
							Send
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
