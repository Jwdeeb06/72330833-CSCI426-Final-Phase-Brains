import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function LoginForm() {
  // store username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // use context for login function
  const navigate = useNavigate(); // used for navigation after login

  // check credentials when form submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password); // wait for backend
    if (success) {
      navigate("/AdminDashboard"); // redirect to admin page if success
    } else {
      alert('Invalid credentials!');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>

    {/* username input */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

    {/* password input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
