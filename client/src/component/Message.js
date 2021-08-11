import React, { useState, useEffect, useContext, useRef } from "react";
import { stateContext } from "providers/StateProvider";
import { databaseContext } from "providers/DatabaseProvider";
import { getHostIdByActivityId } from "helpers/selectors";
import "./Message.css";
import axios from "axios";

//Socket IO
import socketClient from "socket.io-client";
const SERVER = "localhost:8003";

export default function Message() {
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [currentChat, setCurrentChat] = useState(null);
	const [conversation, setConversation] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const { user, users, state } = useContext(databaseContext);
	const { activity } = useContext(stateContext);
	// const socket = useRef(socketClient(SERVER));
	const socket = useRef();
	const { userActivities } = state;

	let receiverId;
	console.log("Activity:", activity, userActivities);
	if (activity) {
		//receiverId = getHostIdByActivityId(activity[0].id, userActivities);
		receiverId = "1";
	}
	const scrollRef = useRef();
	useEffect(() => {
		socket.current = socketClient("ws://localhost:8003");
		socket.current.on("getMessage", (data) => {
			setArrivalMessage({
				senderId: data.senderId.senderId,
				content: data.senderId.content,
				conversationId: data.senderId.conversationId,
				createdAt: new Date(),
			});
		});
	}, []);

	useEffect(() => {
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.senderId) &&
			setMessages((prev) => [...prev, arrivalMessage]);
		//users.includes(arrivalMessage.sender) &&
	}, [arrivalMessage, currentChat]);

	useEffect(() => {
		socket.current.on("welcome", (data) => {
			console.log(data);
		});
		socket.current.emit("addUser", user.id);
		// socket.current.on("getUsers", (users) => {
		// 	setOnlineUsers(
		// 		user.followings.filter((f) => users.some((u) => u.userId === f))
		// 	);
		// });
	}, [user]);

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get(
					"/api/conversations/" + user.id + "-" + receiverId
				);
				let currentChatData = {
					conv_id: res.data[0].conv_id,
					members: [res.data[0].conv_user1id, res.data[0].conv_user2id],
				};
				setCurrentChat(currentChatData);
				setConversation(res.data[0].conv_id);
			} catch (err) {
				console.log(err);
			}
		};
		getConversations();
	}, [user, receiverId]);

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get("/api/messages/" + currentChat.conv_id);
				setMessages(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getMessages();
	}, [currentChat, receiverId, user]);

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

		const messageToDB = {
			receiverId,
			senderId: user.id,
			content: newMessage,
			conversationId: conversation,
			createdAt: new Date(),
		};

		socket.current.emit("sendMessage", {
			receiverId,
			senderId: user.id,
			content: newMessage,
			conversationId: conversation,
			createdAt: new Date(),
		});

		try {
			const res = await axios.post("/api/messages/create", messageToDB);
			messages.push(res.data[0]);
			setMessages([...messages]);
			setNewMessage("");
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
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
				<div className="chat-header">Chat with me</div>
				<div className="chat-container">
					<div className="chat-list">
						{currentChat ? (
							messages.map((msg) => {
								const message = msg && (
									<div
										key={msg.created_at}
										className={`chat-message ${msg.senderId}`}
									>
										<div className="message-text">{msg.content}</div>
										<div className="timestamp">{msg.created_at}</div>
									</div>
								);
								return <div>{message}</div>;
							})
						) : (
							<span className="noConversationText">
								Open a conversation to start a chat.
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
