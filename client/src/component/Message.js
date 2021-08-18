import React, { useState, useEffect, useContext, useRef } from "react";
import { stateContext } from "providers/StateProvider";
import { databaseContext } from "providers/DatabaseProvider";
import { getHostIdByActivityId } from "helpers/selectors";
import "./Message.css";
import axios from "axios";

//Socket IO
import socketClient from "socket.io-client";

export default function Message() {
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [currentChat, setCurrentChat] = useState(null);
	const [conversation, setConversation] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [loggedInUsers, setLoggedInUsers] = useState("");
	const { user, state } = useContext(databaseContext);
	const { activity } = useContext(stateContext);
	const socket = useRef();
	const { userActivities } = state;

	const messagesRef = useRef(null);
	const scrollToBottom = () => {
		messagesRef.current.scrollIntoView({
			behavior: "smooth",
		});
	};
	// useEffect(() => {
	// 	socket.current = socketClient("ws://localhost:8003");

	// 	socket.current.on("getMessage", (data) => {
	// 		setArrivalMessage({
	// 			senderId: data.senderId,
	// 			content: data.content,
	// 			created_at: new Date().toLocaleString(),
	// 		});
	// 	});
	// }, []);

	let { id, title } = activity[0];
	useEffect(() => {
		socket.current = socketClient("ws://localhost:8003");
		let room = { id, title };
		console.log("Usr & Room Values:", user, room);
		socket.current.emit("join", { user, room });
	}, [id, user]);

	useEffect(() => {
		socket.current.on("message", (message) => {
			console.log(
				"Message in first useEffect from server:",
				message,
				messages
				//newText
			);
			setMessages((messages) => [...messages, message]);
		});

		socket.current.on("roomData", ({ users }) => {
			setLoggedInUsers(users);
		});
	}, []);

	// useEffect(() => {
	// 	arrivalMessage &&
	// 		currentChat?.members.includes(arrivalMessage.senderId) &&
	// 		setMessages((prev) => [...prev, arrivalMessage]);
	// }, [arrivalMessage, currentChat]);

	// useEffect(() => {
	// 	socket.current.on("welcome", (data) => {
	// 		console.log(data);
	// 	});
	// 	socket.current.emit("addUser", user.id);
	// 	socket.current.on("getUsers", (users) => {
	// 		// setOnlineUsers(
	// 		// 	user.followings.filter((f) => users.some((u) => u.userId === f))
	// 		// );
	// 		setLoggedInUsers(users);
	// 		console.log("Users from server", users);
	// 	});
	// }, [user]);

	// useEffect(() => {
	// 	const getConversations = async () => {
	// 		try {
	// 			//fetched all conversations for this user
	// 			const res = await axios.get("/api/conversations/" + user.id);

	// 			const participant_id = getHostIdByActivityId(
	// 				activity[0].id,
	// 				userActivities
	// 			);

	// 			//if user.id and participant id are same then do a if firist and then creat conversation id for all the users present on the users list from server and in else do it for where user.id !== participant_id
	// 			let isConv;
	// 			let convList;
	// 			if (participant_id === user.id) {
	// 				convList = res.data.filter(
	// 					(c) => c.user1id === user.id || c.user2id === participant_id
	// 				);
	// 			} else {
	// 				isConv = res.data.find(
	// 					(c) => c.user1id === user.id && c.user2id === participant_id
	// 				);
	// 			}

	// 			if (isConv === undefined) {
	// 				const res = await axios.post("/api/conversations/create", {
	// 					user,
	// 					participant_id,
	// 				});

	// 				if (res.status !== 500) {
	// 					setConversation(res.data);
	// 				} else {
	// 					alert("Error From Back End");
	// 				}
	// 			} else if (convList) {
	// 				console.log("loggedInusers:", loggedInUsers);
	// 				loggedInUsers.map(async (u) => {
	// 					if (
	// 						//need to work on this condition
	// 						//need to check if 3,1 and 1,3 conversation is present if 1 & 3 are online and if any combination not present then add one conversation
	// 						u.receiverId !== user.id &&
	// 						convList.find(
	// 							(c) => c.user1id === user.id && c.user2id === u.receiverId
	// 						)
	// 					) {
	// 						const res = await axios.post("/api/conversations/create", {
	// 							user,
	// 							participant_id,
	// 						});
	// 						if (res.status !== 500) {
	// 							setConversation(res.data);
	// 						} else {
	// 							alert("Error From Back End");
	// 						}
	// 					}
	// 				});
	// 			} else {
	// 				setConversation(res.data);
	// 			}
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	getConversations();
	// }, [user]);

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

	// useEffect(() => {
	// 	const getMessages = async () => {
	// 		try {
	// 			const res = await axios.get("/api/messages/" + currentChat.conv_id);
	// 			setMessages(res.data);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	getMessages();
	// }, [currentChat]);

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

	// const toggle = (e) => {
	// 	setChatopen(!chatopen);

	// 	const participant_id = getHostIdByActivityId(
	// 		activity[0].id,
	// 		userActivities
	// 	);
	// 	let conversationData;
	// 	if (participant_id === user.id) {
	// 		console.log("arrival Message line 113:", arrivalMessage);
	// 		conversationData = conversation.find(
	// 			(c) => c.user1id === user.id || c.user2id === user.id
	// 		);
	// 	} else {
	// 		conversationData = conversation.find(
	// 			(c) => c.user1id === user.id && c.user2id === participant_id
	// 		);
	// 	}

	// 	let currentChatData = {
	// 		conv_id: conversationData.id,
	// 		members: [conversationData.user1id, conversationData.user2id],
	// 	};
	// 	setCurrentChat(currentChatData);
	// };

	const chatTxt = React.createRef();

	const sendChat = async (e) => {
		e.preventDefault();
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

		socket.current.emit("sendMessage", {
			newMessage: messageToDB,
		});

		setNewMessage("");
	};
	// const sendChat = async (e) => {
	// 	e.preventDefault();
	// 	const receiverId = currentChat.members.find((member) => member !== user.id);
	// 	const messageToDB = {
	// 		receiverId: receiverId,
	// 		senderId: user.id,
	// 		content: newMessage,
	// 		conversationId: currentChat.conv_id,
	// 		createdAt: new Date().toLocaleString(),
	// 	};

	// 	socket.current.emit("sendMessage", {
	// 		newMessage,
	// 	});
	// 	// socket.current.emit("sendMessage", {
	// 	// 	receiverId,
	// 	// 	senderId: user.id,
	// 	// 	content: newMessage,
	// 	// });

	// 	try {
	// 		const res = await axios.post("/api/messages/create", messageToDB);
	// 		messages.push(res.data[0]);
	// 		setMessages([...messages]);
	// 		setNewMessage("");
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

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
					{loggedInUsers ? (
						loggedInUsers.map((u) => {
							return <div className="timestamp">{u && u.email}</div>;
						})
					) : (
						<span className="noConversationText">No one online.</span>
					)}
				</div>
				<div className="chat-header"></div>
				<div className="chat-container">
					<div className="chat-list">
						{messages ? (
							messages.map((msg) => {
								// {
								// 	console.log("Msg Deatils in Chat box:", msg);
								// }
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
