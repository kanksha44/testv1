import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    let logout = localStorage.removeItem("token");
    navigate("/login");
  };
  const handleToDo = () => {
    navigate("/todo");
  };
  const handleUserList = () => {
    navigate("/userlist");
  };
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="row d-flex justify-content-center align-items-center flex-column vw-100">
        <button className="col-2 m-1" onClick={handleUserList}>
          User List
        </button>
        <button className="col-2 m-1" onClick={handleToDo}>
          Todo
        </button>
        <button className="col-2 m-1" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
