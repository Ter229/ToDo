import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      setMessage("Success registraiton");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage("Error registraiton");
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Login"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};
export default Register;
