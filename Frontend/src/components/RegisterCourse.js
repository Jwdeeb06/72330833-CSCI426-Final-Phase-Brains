import React, { useState } from "react";
import "../styles/RegisterCourse.css";
import axios from "axios";

  //the API-base for localhosted backend
  // const API_BASE = "http://localhost:5000/api";
const RegisterCourse = ({ course, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://seven2330833-csci426-final-phase-brains.onrender.com/api/registrations/add", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        course_id: course.id,
      });

      alert("✅ Registration submitted successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    }
  };

  return (
    <div className="register-overlay">
      <div className="register-box">
        {/* ❌ Small box on top-left corner */}
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <h2>Register for {course.name}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCourse;
