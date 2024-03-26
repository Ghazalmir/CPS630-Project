import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./MessagePanel.module.css";
import io from "socket.io-client";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../../userContext";
import { parseISO, compareAsc } from 'date-fns';
import { Link } from 'react-router-dom';

function useChatScroll(dep) {
  const ref = React.useRef();
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}


const MessagePanel = () => {
	const { userId, setUserId } = useUser();
	const [newMessage, setNewMessage] = useState("");
	const [conversations, setConversations] = useState([]);
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedConversation, setSelectedConversation] = useState(null);
	const [userData, setUserData] = useState(null);
	const [socket, setSocket] = useState(null);

	const chatContainerRef = useChatScroll(messages);

	useEffect(() => {
		const newSocket = io("http://localhost:8080", {
			query: {
				userId: userId,
			},
		});

		newSocket.on("confirmation", (msg) => {
			console.log(msg);
		});

		newSocket.on("newMessage", (msg) => {
			console.log(msg)
			setMessages((prevMessages) => [...prevMessages, msg]);
		});

		setSocket(newSocket);

		return () => {
		  newSocket.disconnect();
		};
	}, [userId, messages]);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get("http://localhost:8080/api/profile/details", {
					params: {
						signedInUserID: userId,
					},
				});
				setUserData(response.data[0]);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUserData();
	}, [userId]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [conversationsResponse, messagesResponse] = await Promise.all([
					axios.get("http://localhost:8080/api/messages/conversations", {
						params: {
							signedInUserID: userId,
						},
					}),
					axios.get("http://localhost:8080/api/messages/messages", {
						params: {
							signedInUserID: userId,
						},
					}),
				]);

				setConversations(conversationsResponse.data);
				setMessages(messagesResponse.data);
				console.log(messagesResponse.data)
				setLoading(false);
				setSelectedConversation(window.innerWidth >= 764 ? conversationsResponse.data[0] : null);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};
		if (userData) {
			fetchData();
		}
	}, [userId, userData]);

	const handleConversationSelect = (conversation) => {
		setSelectedConversation(conversation);
	};

	const latestMessage = (conversation) => {
		
		let conversationMessages = messages.filter((message) => message.conversation_id === conversation.conversation_id);
		// console.log(conversationMessages.sort((a, b) => compareAsc(parseISO(a.time_stamp), parseISO(b.time_stamp)))[
		// 	conversationMessages.length - 1
		// ])
		return conversationMessages.sort((a, b) => compareAsc(parseISO(a.time_stamp), parseISO(b.time_stamp)))[
			conversationMessages.length - 1
		];
	};

	const otherUsersName = (conversation) => {
		return conversation.userid1 === userId
			? conversation.user2_first_name + " " + conversation.user2_last_name
			: conversation.user1_first_name + " " + conversation.user1_last_name;
	};

	const sendMessage = async () => {
		if (newMessage.trim() === "") return;
		try {
			const response = await axios.post("http://localhost:8080/api/messages/messages", {
				conversation_id: selectedConversation.conversation_id,
				message: newMessage,
				senderID: userId,
				recieverID:
					userId === selectedConversation.userid1 ? selectedConversation.userid2 : selectedConversation.userid1,
			});
		} catch (error) {
			console.error("Error uploading message:", error);
		}

		const message = {
			conversation_id: selectedConversation.conversation_id,
			message: newMessage,
			message_id: uuidv4().toString(),
			receiver_first_name:
				selectedConversation.userid1 === userId
					? selectedConversation.user2_first_name
					: selectedConversation.user1_first_name,
			receiver_id:
				userId === selectedConversation.userid1 ? selectedConversation.userid2 : selectedConversation.userid1,
			receiver_last_name:
				selectedConversation.userid1 === userId
					? selectedConversation.user2_last_name
					: selectedConversation.user1_last_name,
			sender_first_name: userData.first_name,
			sender_id: userId,
			sender_last_name: userData.last_name,
			time_stamp: new Date().toISOString(),
		};

		socket.emit("message", message);
		setMessages([...messages, message]);
		setNewMessage("");
	};



	const [screenSize, setScreenSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const cropContent = (content, maxLength) => {
		return content?.length > maxLength ? content.slice(0, maxLength) + "..." : content;
	};

	useEffect(() => {
		const handleResize = () => {

			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
			if (window.innerWidth >= 763 && !selectedConversation && conversations.length > 0) {
				setSelectedConversation(conversations[0]);
			}
		};

		window.addEventListener("resize", handleResize);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [conversations, selectedConversation]);

	return (
		<>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className="container-fluid">
					<div className="row">
						<div className={`${screenSize.width >= 764 ? "col-md-3" : selectedConversation ? "d-none" : "col-md-12"}`}>
							<h2>Conversations</h2>
							<div className={classes.listGroupContainer}>
								<ul className="list-group">
									{conversations.sort((a, b) => new Date(latestMessage(b).time_stamp) - new Date(latestMessage(a).time_stamp)).map((conversation) => (
										<li
											key={conversation.conversation_id}
											className={`list-group-item ${classes.listGroupItem} ${
												selectedConversation?.conversation_id === conversation.conversation_id ? "active" : ""
											}`}
											onClick={() => handleConversationSelect(conversation)}
										>
											<div>
												<strong>{otherUsersName(conversation)}</strong>
											</div>
											<div className="latest-message">{cropContent(latestMessage(conversation)?.message, 80)}</div>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div
							className={`${
								selectedConversation && screenSize.width < 764 ? "col-md-12" : "col-md-9 d-none d-md-block"
							}`}
						>
							{selectedConversation ? (
								<div className={classes.header}>
									{screenSize.width < 764 && (
										<a
											href="#"
											onClick={() => {
												setSelectedConversation(null);
											}}
										>
											&#x2B05;
										</a>
									)}
									<h2>{otherUsersName(selectedConversation)}</h2>
									<Link to={'/adDetails/' + selectedConversation.product_id}>
										<button className="btn btn-primary">View Item Details</button>
									</Link>
								</div>
							) : (
								<div className={classes.header}>
									<h2>No Messages to Display</h2>
								</div>
							)}
							<div className={classes.messagingPanel}>
								{selectedConversation && (
									<div ref={chatContainerRef} className={classes.messageContainer}>
										{messages
											.filter((message) => message.conversation_id === selectedConversation.conversation_id)
											.sort((a, b) => new Date(a.time_stamp) - new Date(b.time_stamp))
											.map((message) => (
												<div key={message.message_id}>
													<p>
														<strong>{message.sender_first_name}:</strong> {message.message}
													</p>
												</div>
											))}
									</div>
								)}
								<div className={`input-group mt-3 ${classes.inputGroup}`}>
									<input
										type="text"
										className="form-control"
										placeholder="Type your message here..."
										value={newMessage}
										onChange={(e) => {
											if (selectedConversation) {
												setNewMessage(e.target.value);
											}
										}}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												sendMessage();
											}
										}}
									/>
									<div className="input-group-append">
										<button className="btn btn-primary" onClick={sendMessage}>
											Send
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MessagePanel;
