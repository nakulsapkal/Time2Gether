import React, { useState, useReducer } from 'react'
import './Message.css';

const initialState = {
  messages: [],
  sender: '',
  typing: false
};

function reducer(state, action) {
  switch (action.type) {
    case "send-message":
      const message = {
        message: action.payload,
        sender: "you",
        timestamp: new Date()
      };
      return {
        ...state,
        messages: [...state.messages, message],
        typing: false
      };
    case "reply":
      const reply = {
        sender: "not-you",
        message: action.payload,
        timestamp: new Date()
      };
      return {
        ...state,
        messages: [...state.messages, reply],
        typing: false
      };
    case "typing":
      return {
        ...state,
        typing: true
      };
    default:
      return state;
  }
}

export default function Message( props ) {
  let hide = {
    display: 'none',
  }
  let show = {
    display: 'block'
  }
  let textRef = React.createRef()
  // const {messages} = props
  
  const [chatopen, setChatopen] = useState(false)
  const toggle = e => {
    setChatopen(!chatopen)
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const chatTxt = React.createRef();

  function sendChat() {
    dispatch({ type: "send-message", payload: chatTxt.current.value });
    chatTxt.current.value = "";
    chatTxt.current.focus();
    dispatch({ type: "typing" });
    fetch("https://api.kanye.rest/")
      .then(d => d.json())
      .then(d =>
        setTimeout(() => {
          dispatch({ type: "reply", payload: d.quote });
        }, Math.random() * (2500 - 500) + 500)
      );
  }
  
  return (
    <div id='chatCon'>
      <div class="pop">
          <p><img onClick={toggle} src="https://p7.hiclipart.com/preview/151/758/442/iphone-imessage-messages-logo-computer-icons-message.jpg" alt="" /></p>
      </div>
      <div class="chat-box" style={chatopen ? show : hide}>
        
        <div class="header">Chat with me</div>
          <div className="chat-container">
            <div className="chat-list">
              {state.messages.map(msg => {
                const message = msg && (
                  <div
                    key={msg.timestamp.getTime()}
                    className={`chat-message ${msg.sender}`}
                  >
                    <div className="message-text">{msg.message}</div>
                    <div className="timestamp">
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                );
                return <div>{message}</div>
              })}
              {state.typing && <code>Typing...</code>}
            </div>
            <form className="chat-controls" onSubmit={e => e.preventDefault()}>
              <input ref={chatTxt} placeholder="Type message here.." />
              <button id="chat-send-button"onClick={() => sendChat()}>Send</button>
            </form>
          </div>

      </div>

    </div>
  )
}

