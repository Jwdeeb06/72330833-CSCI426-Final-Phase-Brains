import React, { useState } from "react";
import poster from "../assets/poster.png";
import "../styles/Contact.css";
import axios from "axios";

const Contact = () => {
  // store form data in a single object
  const [state, setState] = useState({ fname: "", email: "", message: "" });

  // update input values when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  // handle submit event
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://seven2330833-csci426-final-phase-brains.onrender.com/api/messages/add", {
        name: state.fname,
        email: state.email,
        content: state.message,
      });

      alert("✅ Message sent successfully!");
      setState({ fname: "", email: "", message: "" }); // clear form
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send message");
    }
  };

  return (
    <div className="contact">
      {/* background image section */}
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${poster})` }}
      ></div>

      {/* form section */}
      <div className="rightSide">
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>
            We’d love to hear from you! Fill out the form and we’ll respond
            soon.
          </p>
        </div>

        {/* contact form */}
        <form id="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="fname">Full Name</label>
          <input
            name="fname"
            type="text"
            placeholder="Enter your full name..."
            value={state.fname}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email..."
            value={state.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            rows="6"
            placeholder="Write your message..."
            value={state.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>

        {/* contact info */}
        <div className="contact-info">
          <p>📍 Chaqra, Lebanon</p>
          <p>📞 +961 03 532 430</p>
          <p>✉️ info@brainsinstitute.edu</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
