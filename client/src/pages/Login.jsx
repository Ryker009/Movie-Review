import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, setAuthToken } from "../services/api.js";

import '../styles/auth.css';

export default function Login() {
  const [form, setForm] = useState({ email:"", password:"" });
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.user.name);
      setAuthToken(data.token);
      nav("/movies");
    }catch(e){ setErr(e.response?.data?.message || "Login failed"); }
  }

  return (
    <div className="auth">
      <h2>Welcome back</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" type="email" value={form.email}
          onChange={e=>setForm({...form, email:e.target.value})}/>
        <input placeholder="Password" type="password" value={form.password}
          onChange={e=>setForm({...form, password:e.target.value})}/>
        {err && <p className="error">{err}</p>}
        <button className="btn" type="submit">Login</button>
      </form>
      <p>New here? <Link to="/register">Create account</Link></p>
    </div>
  );
}
