import { Container, IconButton, CssBaseline, Avatar } from "@mui/material";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import TodoList from "./todoList";
import Login from "./Autorize/Login";
import Logout from "./Autorize/Logout";
import { useEffect, useState, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link } from "react-router-dom";
import Profile from "./profile";
import { Navigate } from "react-router-dom";
import { logout, isAuthenticated as checkAuth } from "./services/authService";
import Register from "./Autorize/Register";
import ChatIcon from "@mui/icons-material/Chat";
import Chat from "./Chat/Chat";

function App() {
  const [counts, setCounts] = useState(0);
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? false : true
  );
  const [name, setName] = useState(localStorage.getItem("nick" || ""));

  useEffect(() => {
    setIsAuthenticated(checkAuth());
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };
  const theme = createTheme({
    palette: {
      mode: darkMode ? "light" : "dark",
    },
  });

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "light" : "dark");
      return newTheme;
    });
  };

  const changeAvatar = (img) => {
    setAvatar(img);
    localStorage.setItem("avatar", img);
  };

  const tasksProgress = (count) => {
    setCounts(count);
  };

  const changeNames = (name) => {
    setName(name);
    localStorage.setItem("nick", name);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAuthenticated ? (
        <>
          <Container maxWidth="xl">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Todo List
                </Link>
              </h2>

              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <IconButton onClick={toggleTheme} color="inherit">
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <Link
                  to="/Chats"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ChatIcon></ChatIcon>
                </Link>
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {name}
                    <Avatar
                      src={avatar}
                      sx={{ width: "40px", height: "40px" }}
                    />
                  </div>
                </Link>
                <button onClick={handleLogout}>Выйти</button>
              </div>
            </div>
          </Container>
          <Routes>
            <Route
              path="/"
              element={<TodoList tasksProgress={tasksProgress} />}
            />
            <Route
              path="/profile"
              element={
                <Profile
                  changeAvatar={changeAvatar}
                  changeNames={changeNames}
                />
              }
            />
            <Route path="/Chats" element={<Chat />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </ThemeProvider>
  );
}

export default App;
