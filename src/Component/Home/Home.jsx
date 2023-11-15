import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    let logout = localStorage.removeItem("users");
    navigate("/login");
  };
  return (
    <div>
      <h1>Welocome to home page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
