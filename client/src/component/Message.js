import React, { useState, useEffect, useContext, useRef } from "react";
import { stateContext } from "providers/StateProvider";
import { databaseContext } from "providers/DatabaseProvider";
import { getHostIdByActivityId } from "helpers/selectors";
import "./Message.css";
import axios from "axios";

//Socket IO
import socketClient from "socket.io-client";
import { RestaurantMenu } from "@material-ui/icons";
const SERVER = "localhost:8003";

// const initialState = {
// 	messages: [],
// 	sender: "",
// 	typing: false,
// };

// function reducer(state, action) {
// 	switch (action.type) {
// 		case "send-message":
// 			const message = {
// 				message: action.payload,
// 				sender: "you",
// 				timestamp: new Date(),
// 			};
// 			return {
// 				...state,
// 				messages: [...state.messages, message],
// 				typing: false,
// 			};
// 		case "reply":
// 			const reply = {
// 				sender: "not-you",
// 				message: action.payload,
// 				timestamp: new Date(),
// 			};
// 			return {
// 				...state,
// 				messages: [...state.messages, reply],
// 				typing: false,
// 			};
// 		case "typing":
// 			return {
// 				...state,
// 				typing: true,
// 			};
// 		default:
// 			return state;
// 	}
// }

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

	// console.log("userActivities in messages :", user);
	const receiverId = getHostIdByActivityId(activity[0].id, userActivities);
	// console.log("receiverId Line 65:", activity, receiverId, userActivities);

	//const receiverId = "12";
	useEffect(() => {
		socket.current = socketClient("ws://localhost:8003");
		socket.current.on("getMessage", (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, []);

	useEffect(() => {
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
		//users.includes(arrivalMessage.sender) &&
	}, [arrivalMessage, currentChat]);

	useEffect(() => {
		console.log("User from messages:", user);
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
				console.log("Conversation:", res.data);
				let currentChatData = {
					conv_id: res.data[0].conv_id,
					members: [res.data[0].conv_user1id, res.data[0].conv_user2id],
				};
				setCurrentChat(currentChatData);
				setConversation(res.data[0].conv_id);
				//const allMessages= res.data.map((msgs)>)
				setMessages(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getConversations();
	}, [user, receiverId]);

	// useEffect(() => {
	// 	const getMessages = async () => {
	// 		try {
	// 			const res = await axios.get("/api/conversations/", { currentChat });
	// 			console.log("Messages:", res.data);
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
	//let textRef = React.createRef();
	// const {messages} = props

	const [chatopen, setChatopen] = useState(false);
	const toggle = (e) => {
		setChatopen(!chatopen);
	};

	//const [state, dispatch] = useReducer(reducer, initialState);
	const chatTxt = React.createRef();

	// function sendChat() {
	// 	dispatch({ type: "send-message", payload: chatTxt.current.value });
	// 	chatTxt.current.value = "";
	// 	chatTxt.current.focus();
	// 	dispatch({ type: "typing" });
	// 	fetch("https://api.kanye.rest/")
	// 		.then((d) => d.json())
	// 		.then((d) =>
	// 			setTimeout(() => {
	// 				dispatch({ type: "reply", payload: d.quote });
	// 			}, Math.random() * (2500 - 500) + 500)
	// 		);
	// }

	const sendChat = async (e) => {
		e.preventDefault();
		// console.log("sendChat:", socket);
		// socket.current.emit("addUser", receiverId);

		console.log("sendChat:", socket);
		const messageToDB = {
			receiverId,
			senderId: user.id,
			content: newMessage,
			conversationId: conversation,
		};

		console.log("sendChat:", socket, user.id, receiverId, chatTxt, newMessage);
		socket.current.emit("sendMessage", {
			senderId: user.id,
			receiverId,
			text: newMessage,
		});

		try {
			console.log("sendChat:", socket, messageToDB);

			const res = await axios.post("/api/messages/create", messageToDB);

			console.log("sendChat:", socket);
			setMessages([...messages, res.data]);
			setNewMessage("");
		} catch (err) {
			console.log(err);
		}
	};

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
				<div className="header">Chat with me</div>
				<div className="chat-container">
					<div className="chat-list">
						{messages.map((msg) => {
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
						})}
						{/* {state.typing && <code>Typing...</code>} */}
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
