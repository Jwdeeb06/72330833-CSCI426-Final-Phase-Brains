const db = require("./config");

/* USERS TABLE */
const usersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

/* CATEGORY TABLE */
const categoryTable = `
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE
);
`;

/* COURSE TABLE */
const courseTable = `
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  category_id INT,
  price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);
`;

/* REGISTRATION TABLE */
const registrationTable = `
CREATE TABLE IF NOT EXISTS registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  course_id INT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  email VARCHAR(150),
  phone VARCHAR(50),
  is_approved BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (course_id) REFERENCES courses(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);
`;

/* MESSAGE TABLE */
const messageTable = `
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  email VARCHAR(150),
  content TEXT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_readed BOOLEAN DEFAULT FALSE
);
`;

/* MIGRATION: ADD IMAGE TO COURSES */
const addCourseImageColumn = `
ALTER TABLE courses
ADD COLUMN image VARCHAR(255) NOT NULL AFTER description;
`;

/* EXECUTE TABLE CREATION */
db.query(usersTable, () => console.log("✅ users table ready"));
db.query(categoryTable, () => console.log("✅ categories table ready"));
db.query(courseTable, () => console.log("✅ courses table ready"));
db.query(registrationTable, () => console.log("✅ registrations table ready"));
db.query(messageTable, () => console.log("✅ messages table ready"));

db.query(addCourseImageColumn, (err) => {
  if (err) {
    if (err.code === "ER_DUP_FIELDNAME") {
      console.log("ℹ️ image column already exists in courses");
    } else {
      console.error("❌ Failed to add image column:", err.message);
    }
  } else {
    console.log("✅ image column added to courses");
  }
});