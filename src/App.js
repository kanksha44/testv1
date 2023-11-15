import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Component/LoginPage/Login";
import Register from "./Component/Register/Register";
import Home from "./Component/Home/Home";
import Protected from "./Component/Proetcted/Protected";
import UserList from "./Component/UserList/UserList";
import ToDo from "./Component/Todo/Todo";

function App() {
  const isAuthenticateds = localStorage.getItem("users") !== null;

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null
  );

  const setAuth = (value) => {
    setIsAuthenticated(value);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/todo" element={<ToDo />} />
        <Route
          path="/home"
          element={
            <Protected isAuthenticated={isAuthenticated} setAuth={setAuth}>
              <Home />
            </Protected>
          }
        />
        <Route path="/" element={<Navigate to="/register" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
