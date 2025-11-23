import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/admin/login", { email, password });

      // Save token from admin login
      localStorage.setItem("token", res.data.token);

      alert("Admin Login Successful!");

      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page">
      <h2>Admin Login</h2>

      <form onSubmit={submit} className="form">

        <input
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
}
