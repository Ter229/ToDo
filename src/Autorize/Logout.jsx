import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    onLogout();
    navigate("/login");
  };
  return (
    <>
      <Button onClick={handleLogout} variant="contained">
        Logout
      </Button>
    </>
  );
};

export default Logout;
