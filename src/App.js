import React, { useState} from "react";
import "./App.css";

const user_list = ["Alex", "Alan", "Bob", "Carol", "Dean", "Elin"];

function App() {
  // Define state variables for the chat messages and input value
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showUserList, setShowUserList] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.includes("@")) {
      const searchValue = value.split("@")[1].toLowerCase();
      const filteredUsers = user_list.filter((user) =>
        user.toLowerCase().startsWith(searchValue)
      );
      setFilteredUsers(filteredUsers);
      setShowUserList(true);
    } else {
      setShowUserList(false);
    }
  };

  // When the send button is clicked, add a new message object to the messages state
  const handleSendButtonClick = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        user: user_list[Math.floor(Math.random() * user_list.length)],
        text: inputValue,
        likes: 0,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");
      setShowUserList(false);
    }
  };

  // When the like button is clicked, increment the likes count for the corresponding message
  const handleLikeClick = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].likes++;
    setMessages(updatedMessages);
  };

  // When a user is clicked in the user list, insert their name in the input field
  const handleUserClick = (username) => {
    const searchValue = inputValue.split("@")[1];
    const newInputValue = inputValue.replace(`@${searchValue}`, `@${username}`);
    setInputValue(newInputValue);
    setShowUserList(false);
  };

  // Render the app with the chat messages, input field, and send button
  return (
    <div className="App">
      <div className="sidebar">
        <h1>Chat APP</h1>
        <p>Chats</p>
        <p>Contacts</p>
        <p>Settings</p>
      </div>
      <div className="chat-container">
        <div className="message-thread">
          {messages.map((message, index) => (
            <div className="message" key={index}>
              <div className="message-header">
                <span>{message.user}</span>
                <button
                  className="like-button"
                  onClick={() => handleLikeClick(index)}
                >
                  <span className="likes">{message.likes}</span>Like
                </button>
              </div>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type a message"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="send-button" onClick={handleSendButtonClick}>
            Send
          </button>
          {showUserList && (
            <div className="user-list">
              {filteredUsers.map((username) => (
                <div
                  className="user"
                  key={username}
                  onClick={() => handleUserClick(username)}
                >
                  {username}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
