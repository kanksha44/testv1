import React, { useState } from "react";
import "./Login.css";
import loginImg from "../../Assets/loginpage.png";
import logoImg from "../../Assets/shipcom-logo-black.svg.jpg";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("token", "yourAuthToken"); // Store some token upon successful login
      setAuth(true);
      alert("Login successful!");
      navigate("/home");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };
  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border shadow box-area">
          {/* left box */}
          <div className="col-md-6  d-flex justify-content-center align-items-start flex-column left-box">
            <img src={loginImg} alt="loginimg" />
          </div>

          {/* right box */}

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="col-12 header-text d-flex flex-column justify-content-center align-items-center">
                <img src={logoImg} alt="logoImg" className="logo-img m-4" />

                <h5 className="m-2">Welcome</h5>
                <small>Login to Labs Monitoring System</small>
              </div>

              <div className="col-12  mt-4 d-flex flex-column justify-content-center align-items-center">
                <div className="col-6 mb-3">
                  <form action="">
                    <div className="input-container">
                      <input
                        type="text"
                        id="email"
                        className="bg-light text-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        required
                      />
                      <label htmlFor="email" className="label-input">
                        Email
                      </label>
                    </div>
                  </form>
                </div>

                <div className="col-6 mb-3">
                  <form action="">
                    <div className="input-container">
                      <input
                        type="password"
                        id="password"
                        className="bg-light text-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                        required
                      />
                      <label htmlFor="password" className="label-input">
                        Password
                      </label>
                    </div>
                  </form>
                </div>
              </div>

              <div className="input-group mb-5 d-flex justify-content-end">
                <div className="forgot">
                  <small>
                    <Link>Forgot Password?</Link>
                  </small>
                </div>
              </div>
              <div className="d-flex justify-content-around align-item-center mb-3">
                <button
                  onClick={handleLogin}
                  className="btn btn-primary w-50 fs-6"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
