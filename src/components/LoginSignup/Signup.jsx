import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      const data = await res.json();
      if(res.status===409){
        toast.error("User already exists");
        return;
      }
      if (res.ok) {
        // Handle successful response
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('role', data.role);
        navigate(role === 'admin' ? '/admin' : '/');
        toast.success('Signup successful!');
      } else {
        // Handle errors
        toast.error(data.errors?.username?.message || 'Signup failed');
      }
    } catch (e) {
      console.error('An unexpected error occurred:', e);
      toast.error('An unexpected error occurred');
    }
  }

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="sign-up-form">
      <h2 className="title">Sign Up</h2>

      <div className="input-field">
        <FaUser className="icon" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="input-field">
        <FaEnvelope className="icon" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-field">
        <FaLock className="icon" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="select-option">
        <select value={role} onChange={handleChange}>
          <option value="" disabled>
            Choose Your Role
          </option>
          <option value="user">USER</option>
          <option value="admin">ADMIN</option>
        </select>
      </div>

      <input type="submit" value="Sign Up" className="btn solid" />
    </form>
  );
}
