import React, { useState } from "react";
import "./Register.css";
import registerImg from "../../Assets/loginpage.png";
import logoImg from "../../Assets/shipcom-logo-black.svg.jpg";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    if (userName && email && password) {
      const user = {
        userName,
        email,
        password,
      };

      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      existingUsers.push(user);

      localStorage.setItem("users", JSON.stringify(existingUsers));

      localStorage.setItem("loggedInUser", userName); 


      setUserName("");
      setEmail("");
      setPassword("");

      alert("Registration successful!");
      navigate("/login");
    } else {
      alert("Please fill in all the fields!");
    }
  };

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border shadow box-area">
          {/* left box */}
          <div className="col-md-6  d-flex justify-content-center align-items-start flex-column left-box">
            <img src={registerImg} alt="registerImg" />
          </div>

          {/* right box */}

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="col-12 header-text d-flex flex-column justify-content-center align-items-center">
                <img src={logoImg} alt="logoImg" className="logo-img mb-2" />

                <h5 className="m-2">Welcome</h5>
                <small className="mb-3">
                  Register to Labs Monitoring System
                </small>
              </div>
              <label htmlFor="">User Name</label>
              <div className="col-6 input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg fs-6 bg-light custom-input"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <label htmlFor="">Email</label>
              <div className="col-6 input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg fs-6 bg-light custom-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <label htmlFor="">Password</label>
              <div className="col- input-group mb-3">
                <input
                  type="password"
                  className="form-control custom-input form-control-lg bg-light fs-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="input-group mb-5 d-flex justify-content-end">
                <div className="forgot">
                  <small>
                    <Link to="/login">Already have an account</Link>
                  </small>
                </div>
              </div>
              <div className="input-group mb-3">
                <button
                  onClick={handleRegister}
                  className="btn btn-primary w-100 fs-6"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
