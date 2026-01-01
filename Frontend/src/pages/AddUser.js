import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddUser.css";

const AddUser = () => {
  const [activeusers, setactiveUsers] = useState([]);
  const [Inactiveusers, setInactiveUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //the API-base for Render hosted backend
  const API_BASE = "https://seven2330833-csci426-final-phase-brains.onrender.com/api";

  //the API-base for localhosted backend
  // const API_BASE = "http://localhost:5000/api";

  // Fetch users from backend
  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/users`);
        setactiveUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    const fetchInactiveUsers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/users/in`);
        setInactiveUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch inactive users:", err);
      }
    };
    fetchActiveUsers();
    fetchInactiveUsers();
  }, []);

  // Add new user
  const handleAddUser = async () => {
    if (!username || !password) {
      alert("⚠️ Please fill in all fields.");
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/users/add`, {
        username,
        password,
      });
      alert(res.data.message);
      // Update frontend list
      setactiveUsers([
        ...activeusers,
        { id: res.data.insertId, username, password, is_active: 1 },
      ]);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add user.");
    }
  };

  // Toggle user active status in database
  const toggleUser = async (user, isActiveList) => {
    try {
      await axios.put(`${API_BASE}/users/toggle/${user.id}`, {
        is_active: !user.is_active,
      });

      if (isActiveList) {
        // move from active → inactive
        setactiveUsers(activeusers.filter((u) => u.id !== user.id));
        setInactiveUsers([...Inactiveusers, { ...user, is_active: 0 }]);
      } else {
        // move from inactive → active
        setInactiveUsers(Inactiveusers.filter((u) => u.id !== user.id));
        setactiveUsers([...activeusers, { ...user, is_active: 1 }]);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update user status");
    }
  };

  return (
    <div className="add-user-page">
      <h1>Add User</h1>

      <div className="add-user-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <h2>active users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {activeusers.map((activeusers) => (
            <tr key={activeusers.id}>
              <td>{activeusers.username}</td>
              <td>{activeusers.password}</td>
              <td>{activeusers.is_active ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className={`status-btn ${
                    activeusers.is_active ? "deactivate" : "activate"
                  }`}
                  onClick={() => toggleUser(activeusers, true)}
                >
                  {activeusers.is_active ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <h2>inactive users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Inactiveusers.map((Inactiveusers) => (
            <tr key={Inactiveusers.id}>
              <td>{Inactiveusers.username}</td>
              <td>{Inactiveusers.password}</td>
              <td>{Inactiveusers.is_active ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className={`status-btn ${
                    Inactiveusers.is_active ? "deactivate" : "activate"
                  }`}
                  onClick={() => toggleUser(Inactiveusers, false)}
                >
                  {Inactiveusers.is_active ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddUser;
