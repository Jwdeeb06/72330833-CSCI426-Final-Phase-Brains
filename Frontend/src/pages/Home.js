import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import poster from "../assets/poster.png";
import logo from "../assets/logo.png";
import "../styles/Home.css";
import axios from "axios";

  //the API-base for localhosted backend
  // const API_BASE = "http://localhost:5000/api";
  
const Home = () => {
  const navigate = useNavigate(); // for navigating between pages

  // course categories with colors
  // state to store categories from backend
  const [categories, setCategories] = useState([]);
  // fetch categories when page loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://seven2330833-csci426-final-phase-brains.onrender.com/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // useeffect navigate to menu page and send selected category
  const handleCategoryClick = (categoryName) => {
    navigate("/menu", { state: { category: categoryName } });
  };

  return (
    <div className="homepage-container">
      {/* main image section */}
      <div className="hero-section">
        <img src={poster} alt="poster" className="hero-poster" />
        <div className="hero-overlay">
          <img src={logo} alt="logo" className="hero-logo" />
        </div>
      </div>

      {/* main content */}
      <div className="home-content">
        <section className="home-section intro">
          <h2>Explore Our Courses by Category</h2>
          <p>
            Choose a category to explore the available courses directly in that
            field. Each category will take you to our course catalog filtered
            automatically.
          </p>
        </section>

        {/* category cards */}
        <section className="categories-section">
          <div className="category-grid">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="category-card"
                style={{ borderColor: cat.color }}
                onClick={() => handleCategoryClick(cat.name)}
              >
                <h3 style={{ color: cat.color }}>{cat.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
