import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Alert } from "@mui/material";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      onLogin();
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: "30px",
            textAlign: "center",
          }}
        >
          <h2>Sign In</h2>
          <Link to={"/register"}>
            <h2>Registration</h2>
          </Link>
          <TextField
            required={true}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            id="standard-basic"
            label="Standard"
            variant="standard"
            placeholder="type email"
          />
          <TextField
            required={true}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="standard-basic"
            label="Standard"
            variant="standard"
            placeholder="type password"
          />
          {error && (
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          )}
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
