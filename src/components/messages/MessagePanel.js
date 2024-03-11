import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./MessagePanel.module.css";

const conversations = [
	{ id: 1, listingName: "bike", listingLink: "example", name1: "John Doe", name2: "Matt" },
	{ id: 2, listingName: "math textbook", listingLink: "example2", name1: "Jane Smith", name2: "Matt" },
	{ id: 3, listingName: "english tutoring", listingLink: "example3", name1: "Matt", name2: "Jane Smith" },
	{ id: 4, listingName: "bike", listingLink: "example", name1: "John Doe", name2: "Matt" },
	{ id: 5, listingName: "math textbook", listingLink: "example2", name1: "Jane Smith", name2: "Matt" },
	{ id: 6, listingName: "english tutoring", listingLink: "example3", name1: "Matt", name2: "Jane Smith" },
	{ id: 7, listingName: "bike", listingLink: "example", name1: "John Doe", name2: "Matt" },
	{ id: 8, listingName: "math textbook", listingLink: "example2", name1: "Jane Smith", name2: "Matt" },
	{ id: 9, listingName: "english tutoring", listingLink: "example3", name1: "Matt", name2: "Jane Smith" },
	{ id: 10, listingName: "bike", listingLink: "example", name1: "John Doe", name2: "Matt" },
	{ id: 11, listingName: "math textbook", listingLink: "example2", name1: "Jane Smith", name2: "Matt" },
	{ id: 12, listingName: "english tutoring", listingLink: "example3", name1: "Matt", name2: "Jane Smith" },
	{ id: 13, listingName: "bike", listingLink: "example", name1: "John Doe", name2: "Matt" },
	{ id: 14, listingName: "math textbook", listingLink: "example2", name1: "Jane Smith", name2: "Matt" },
	{ id: 15, listingName: "english tutoring", listingLink: "example3", name1: "Matt", name2: "Jane Smith" },
];

const signedInUserName = "Matt";
let latestID = 11; //temporary until we have backend

const messages = [
	{ id: 1, conversation_id: 1, sender: "John Doe", content: "Hey I'd like to buy your item!", timeSent: 0 },
	{ id: 2, conversation_id: 1, sender: "Matt", content: "Okay! when are you free to meet?", timeSent: 1 },
	{ id: 3, conversation_id: 1, sender: "John Doe", content: "Would tomorrow at 5pm work for you?", timeSent: 2 },
	{ id: 4, conversation_id: 1, sender: "Matt", content: "Yes that's perfect. see you then.", timeSent: 3 },
	{
		id: 5,
		conversation_id: 2,
		sender: "Matt",
		content: "Hey I'd like to buy your textbook, would you take $5?",
		timeSent: 2,
	},
	{ id: 6, conversation_id: 2, sender: "Jane Smith", content: "Not a chance", timeSent: 8 },
	{ id: 7, conversation_id: 2, sender: "Matt", content: "that ripped up book isn't even worth a dime", timeSent: 10 },
	{ id: 8, conversation_id: 2, sender: "Jane Smith", content: "fuck off", timeSent: 11 },
	{ id: 9, conversation_id: 3, sender: "Matt", content: "Hey I'm interested in your tutoring services!", timeSent: 1 },
	{
		id: 10,
		conversation_id: 3,
		sender: "Jane Smith",
		content: "Not after what you said about my textbook!",
		timeSent: 3,
	},
	{ id: 11, conversation_id: 3, sender: "John Doe", content: "this is so unfair.", timeSent: 10 },
];

const MessagePanel = () => {
	const [selectedConversation, setSelectedConversation] = useState(window.innerWidth >= 764 ? conversations[0] : null);
	const [newMessage, setNewMessage] = useState("");

	const handleConversationSelect = (conversation) => {
		setSelectedConversation(conversation);
	};

	const latestMessage = (conversation) => {
		let conversationMessages = messages.filter((message) => message.conversation_id === conversation.id);
		return conversationMessages.sort((a, b) => a.timeSent - b.timeSent)[conversationMessages.length - 1];
	};

	const otherUsersName = (conversation) => {
		return conversation.name1 === signedInUserName ? conversation.name2 : conversation.name1;
	};

	const sendMessage = () => {
		console.log(messages);
		if (newMessage.trim() === "") return;
		latestID = latestID + 1;
		messages.push({
			id: latestID,
			conversation_id: selectedConversation.id,
			sender: signedInUserName,
			content: newMessage,
			timeSent: latestMessage(selectedConversation) ? latestMessage(selectedConversation).timeSent + 1 : 0, //will change once backend
		});
		console.log("Sending message:", newMessage);
		setNewMessage("");
	};

	const [screenSize, setScreenSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
			if (window.innerWidth >= 763 && !selectedConversation) {
				setSelectedConversation(conversations[0]);
			}
		};

		window.addEventListener("resize", handleResize);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className={`${screenSize.width >= 764 ? "col-md-3" : selectedConversation ? "d-none" : "col-md-12"}`}>
					<h2>Conversations</h2>
					<div className={classes.listGroupContainer}>
						<ul className="list-group">
							{conversations.map((conversation) => (
								<li
									key={conversation.id}
									className={`list-group-item ${classes.listGroupItem} ${selectedConversation?.id === conversation.id ? "active" : ""}`}
									onClick={() => handleConversationSelect(conversation)}
								>
									<div>
										<strong>{otherUsersName(conversation)}</strong>
									</div>
									<div className="latest-message">{latestMessage(conversation)?.content}</div>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div
					className={`${selectedConversation && screenSize.width < 764 ? "col-md-12" : "col-md-9 d-none d-md-block"}`}
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
							<button className="btn btn-primary">View Item Details</button>
						</div>
					) : (
						<div className={classes.header}>
							<h2>No Messages to Display</h2>
						</div>
					)}
					<div className={classes.messagingPanel}>
						{selectedConversation && (
							<div className={classes.messageContainer}>
								{messages
									.filter((message) => message.conversation_id === selectedConversation.id)
									.map((message) => (
										<div key={message.id}>
											<p>
												<strong>{message.sender}:</strong> {message.content}
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
	);
};

export default MessagePanel;
