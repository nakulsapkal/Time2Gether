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

	//console.log("Activity:", activity, userActivities);

	const scrollRef = useRef();
	useEffect(() => {
		socket.current = socketClient("ws://localhost:8003");
		console.log("Its in useEffect [] For socket connection:", socket.current);

		socket.current.on("getMessage", (data) => {
			setArrivalMessage({
				senderId: data.senderId,
				content: data.content,
				created_at: new Date().toLocaleString(),
			});
			console.log("Its in useEffect [] LINE 37:", data.senderId, data.content);
		});
	}, []);

	useEffect(() => {
		console.log("Its in useEffect [] LINE 42:", arrivalMessage, currentChat);

		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.senderId) &&
			setMessages((prev) => [...prev, arrivalMessage]);
		//users.includes(arrivalMessage.sender) &&
		console.log("Its in useEffect [] LINE 48:", messages);
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
				//fetched all conversations for this user
				const res = await axios.get("/api/conversations/" + user.id);
				// let currentChatData = {
				// 	conv_id: res.data[0].conv_id,
				// 	members: [res.data[0].conv_user1id, res.data[0].conv_user2id],
				// };
				// setCurrentChat(currentChatData);
				//setConversation(res.data[0].conv_id);
				const participant_id = getHostIdByActivityId(
					activity[0].id,
					userActivities
				);
				console.log(
					"Here at 74 in Message.js file:",
					res.data.length,
					res.data,
					participant_id
				);

				const isConv = res.data.find(
					(c) => c.user1id === participant_id || c.user2id === participant_id
				);

				if (isConv === undefined) {
					const res = await axios.post("/api/conversations/create", {
						user,
						participant_id,
					});

					if (res.status !== 500) {
						console.log("New Conversation started", res.data);
						setConversation(res.data);
					} else {
						alert("Error From Back End");
					}
				} else {
					console.log(
						"Here at 102 in Message.js file:",
						conversation,
						res.data,
						isConv
					);
					setConversation(res.data);
				}
				console.log("Here at 105 in Message.js file:", conversation, res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getConversations();
	}, [user]);

	useEffect(() => {
		console.log("CurrrChat:", currentChat);
		const getMessages = async () => {
			try {
				const res = await axios.get("/api/messages/" + currentChat.conv_id);
				setMessages(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getMessages();
	}, [currentChat]);

	let hide = {
		display: "none",
	};
	let show = {
		display: "block",
	};

	const [chatopen, setChatopen] = useState(false);
	const toggle = (e) => {
		setChatopen(!chatopen);

		const participant_id = getHostIdByActivityId(
			activity[0].id,
			userActivities
		);
		console.log("arrivalMessage: Line 105:", arrivalMessage);
		let conversationData;
		if (participant_id === user.id) {
			conversationData = conversation.find(
				(c) => c.user1id === user.id || c.user2id === user.id
			);
		} else {
			conversationData = conversation.find(
				(c) => c.user1id === user.id && c.user2id === participant_id
			);
		}

		console.log(
			"Here at 119 in Message.js file:",
			conversation,
			participant_id,
			conversationData
		);
		let currentChatData = {
			conv_id: conversationData.id,
			members: [conversationData.user1id, conversationData.user2id],
		};
		setCurrentChat(currentChatData);
		console.log("Here at 129 in Message.js file:", currentChat);
	};

	const chatTxt = React.createRef();

	const sendChat = async (e) => {
		e.preventDefault();
		const receiverId = currentChat.members.find((member) => member !== user.id);
		const messageToDB = {
			receiverId: receiverId,
			senderId: user.id,
			content: newMessage,
			conversationId: currentChat.conv_id,
			createdAt: new Date().toLocaleString(),
		};

		console.log(
			"Here at 145 in Message.js file:",
			receiverId,
			user.id,
			currentChat,
			newMessage
		);

		socket.current.emit("sendMessage", {
			receiverId,
			senderId: user.id,
			content: newMessage,
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
						{console.log("Messages:", messages)}
						{currentChat ? (
							messages.map((msg) => {
								{
									console.log("msg:", msg);
								}
								const message = msg && (
									<div
										key={msg.created_at}
										className={`chat-message ${msg.senderId}`}
									>
										<div className="message-text">{msg.content}</div>
										{console.log("msg.created_at:", msg.created_at)}
										{msg && msg.created_at}
										{/* <div className="timestamp">{msg && msg.created_at}</div> */}
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
