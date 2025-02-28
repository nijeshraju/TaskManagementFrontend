import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = process.env.BACKEND_URL;

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", res.data.data.accessToken);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login_form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form_group">
          <label>Username</label>
          <input
            type="text"
            placeholder="user"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form_group">
          <label>Password</label>
          <input
            type="password"
            placeholder="user@123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
