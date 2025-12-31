import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddCourse.css";

const AddCourse = () => {
  // store all added courses
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  // form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const API_BASE = "http://localhost:5000/api";
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  // fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE}/categories`);
        setCategories(res.data);
        if (res.data.length) setCategoryId(res.data[0].id); // default selected
      } catch (err) {
        console.error(err);
        alert("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // fetch existing courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE}/courses`);
        setCourses(
          res.data.map((c) => ({
            ...c,
            image: `http://localhost:5000/assets/${c.image}`,
            categoryName:
              categories.find((cat) => cat.id === c.category_id)?.name || "",
          }))
        );
      } catch (err) {
        console.error(err);
        alert("Failed to load courses");
      }
    };
    fetchCourses();
  }, [categories]);

  // handle uploaded image and show preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImage(null);
      setPreview(null);
      return;
    }

    setImage(file); // ✅ send FILE to backend
    setPreview(URL.createObjectURL(file)); // ✅ preview only
  };

  // add new course to list
  const handleAddCourse = async () => {
    if (!name || !price || !categoryId || !description || !image) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    try {
      if (!categoryId) {
        alert("Please select a category");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category_id", categoryId);
      formData.append("description", description);
      formData.append("image", image);

      const res = await axios.post(`${API_BASE}/courses/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);

      // add newly created course to the table
      setCourses([
        ...courses,
        {
          id: Date.now(),
          name,
          price,
          categoryName: categoryId,
          description,
          image: preview,
        },
      ]);

      // reset form
      setName("");
      setPrice("");
      setCategoryId(categories[0].name);
      setDescription("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add course");
    }
  };

  // remove a course by id
  const handleRemove = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE}/courses/delete/${id}`);

      // Update UI after backend success
      setCourses(courses.filter((course) => course.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    const res = await axios.post(`${API_BASE}/categories/add`, {
      name: newCategory,
    });

    const created = { id: res.data.insertId, name: newCategory };

    setCategories([...categories, created]);
    setCategoryId(created.id);
    setNewCategory("");
  };

  const handleDeleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE}/categories/delete/${id}`);

      const updated = categories.filter((c) => c.id !== id);
      setCategories(updated);

      if (id === categoryId && updated.length) {
        setCategoryId(updated[0].id);
      }
    } catch (err) {
      alert("Failed to delete category");
    }
  };

  return (
    <div className="add-course-page">
      <h1>Add Course</h1>

      {/* input form */}
      <div className="add-course-form">
        <input
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Course Price (e.g. 300)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setShowCategoryManager(!showCategoryManager)}
        >
          Manage Categories
        </button>
        {showCategoryManager && (
          <div className="category-manager">
            <h4>Manage Categories</h4>

            <input
              type="text"
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button onClick={handleAddCategory}>Add</button>

            <ul className="cat-list">
              {categories.map((cat) => (
                <li key={cat.id} className="cat-item">
                  <span className="cat-name">{cat.name}</span>
                  <button
                    className="cat-delete "
                    onClick={() => handleDeleteCategory(cat.id)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <textarea
          placeholder="Course Description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className="preview" />}

        <button onClick={handleAddCourse}>Add Course</button>
      </div>

      {/* table of added courses */}
      <table className="course-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>
                <img
                  src={course.image}
                  alt={course.name}
                  className="table-img"
                />
              </td>
              <td>{course.name}</td>
              <td>${course.price}</td>
              <td>{course.category}</td>
              <td>{course.description}</td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(course.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddCourse;
