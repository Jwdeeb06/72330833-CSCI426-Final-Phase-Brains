import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Registrations.css";

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const API_BASE = "http://localhost:5000/api";

  // fetch registrations from backend
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await axios.get(`${API_BASE}/registrations`);
        setRegistrations(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load registrations");
      }
    };
    fetchRegistrations();
  }, []);

  // approve a registration
  const handleApprove = async (id) => {
    try {
      await axios.put(`${API_BASE}/registrations/approve/${id}`);
      setRegistrations(
        registrations.map((r) => (r.id === id ? { ...r, is_approved: 1 } : r))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to approve registration");
    }
  };

  // deny/delete a registration
  const handleDeny = async (id) => {
    if (
      !window.confirm("Are you sure you want to deny/delete this registration?")
    )
      return;

    try {
      await axios.delete(`${API_BASE}/registrations/delete/${id}`);
      setRegistrations(registrations.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete registration");
    }
  };

  return (
    <div className="registrations-page">
      <h1>Registrations</h1>

      <table className="registrations-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.phone}</td>
              <td
                className={`status ${r.is_approved ? "approved" : "pending"}`}
              >
                {r.is_approved ? "Approved" : "Pending"}
              </td>
              <td>
                {!r.is_approved && (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(r.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="deny-btn"
                      onClick={() => handleDeny(r.id)}
                    >
                      Deny
                    </button>
                  </>
                )}
                {r.is_approved && <span>✔️</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Registrations;
