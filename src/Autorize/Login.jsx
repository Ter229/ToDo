import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Alert } from "@mui/material";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "user@example.com" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      onLogin();
    } else {
      setError(true);
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
          <TextField
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
              Invalid username or password
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
