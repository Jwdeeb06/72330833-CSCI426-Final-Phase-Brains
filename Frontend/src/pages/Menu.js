import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CourseItem from "../components/CourseItem";
import RegisterCourse from "../components/RegisterCourse";
import "../styles/Menu.css";
import axios from "axios";

const Menu = () => {
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  // use effect for the home and menu cat btn
  // 1️⃣ get category from Home page
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    } else {
      setSelectedCategory("ALL");
    }
  }, [location.state]);

  // 2️⃣ fetch categories
  useEffect(() => {
    axios
      .get("https://seven2330833-csci426-final-phase-brains.onrender.com/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 3️⃣ fetch courses (all or by category)
  useEffect(() => {
    let url = "https://seven2330833-csci426-final-phase-brains.onrender.com/api/courses";

    // find category id
    if (selectedCategory !== "ALL") {
      const category = categories.find((c) => c.name === selectedCategory);
      if (category) {
        url = `https://seven2330833-csci426-final-phase-brains.onrender.com/api/courses/by-category/${category.id}`;
      }
    }

    axios
      .get(url)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, [selectedCategory, categories]);

  return (
    <div className="menu">
      <h1 className="menuTitle">Our Courses</h1>

      <div className="filter-bar">
        <button
          className={`filter-btn ${selectedCategory === "ALL" ? "active" : ""}`}
          onClick={() => setSelectedCategory("ALL")}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-btn ${
              selectedCategory === cat.name ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* courses */}
      <div className="menuList">
        {courses.map((course) => (
          <div key={course.id} onClick={() => setSelectedCourse(course)}>
            <CourseItem
              image={`https://seven2330833-csci426-final-phase-brains.onrender.com/assets/${course.image}`}
              name={course.name}
              price={course.price}
            />
          </div>
        ))}
      </div>

      {/* registration popup */}
      {selectedCourse && (
        <RegisterCourse
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default Menu;
