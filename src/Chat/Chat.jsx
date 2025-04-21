import React, { useEffect, useState, useRef } from "react";
import { Avatar, Container, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { io } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";

const socket = io("http://localhost:5000", { autoConnect: false });

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null); // Реф для прокрутки к последнему сообщению

  useEffect(() => {
    socket.connect();

    socket.on("receiveMessage", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Прокручиваем вниз при каждом новом сообщении
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Container sx={{ display: "flex" }} maxWidth="xl">
      <Paper
        sx={{
          width: "40%",
          height: "90vh", // Уменьшаем высоту блока с пользователем
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            border: "1px solid purple",
            padding: "15px",
            display: "flex",
          }}
        >
          <Avatar sx={{ width: 50, height: 50 }} />
          <div
            style={{
              display: "flex",
              fontSize: 14,
              marginLeft: 15,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>
              <div style={{ fontSize: 18 }}>Name channel</div>
              <div style={{ opacity: 0.7 }}>current message</div>
            </div>
            <div style={{ opacity: 0.7 }}>12:00</div>
          </div>
        </div>
      </Paper>

      <Paper
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          height: "90vh", // Уменьшаем высоту блока с чатом
        }}
      >
        <div style={{ border: "3px solid purple", padding: "5px" }}>
          Name channel
        </div>
        {/* Блок с сообщениями */}
        <div
          style={{
            flex: 1, // Сообщения занимают все пространство
            overflowY: "auto", // Прокрутка внутри блока
            padding: "15px",
            borderBottom: "1px solid purple",
            display: "flex",
            flexDirection: "column",
            height: "calc(90vh - 150px)", // Высота с учетом отступа для инпута
          }}
        >
          {chat.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
          <div ref={messagesEndRef} />{" "}
          {/* Этот элемент будет использоваться для прокрутки */}
        </div>

        {/* Блок с инпутом */}
        <div
          style={{
            borderTop: "1px solid purple",
            padding: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            onKeyDown={handleKeyDown}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              flex: 1,
              marginRight: "10px",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <SendIcon style={{ cursor: "pointer" }} onClick={sendMessage}>
            Отправить
          </SendIcon>
        </div>
      </Paper>
    </Container>
  );
};

export default Chat;
