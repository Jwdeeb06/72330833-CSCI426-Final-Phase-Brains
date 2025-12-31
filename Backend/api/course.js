const express = require("express");
const router = express.Router();
const db = require("../config");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure assets folder exists
const assetsDir = path.join(__dirname, "..", "assets");
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, assetsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `course_${Date.now()}${ext}`;
    cb(null, name);
  },
});

const upload = multer({ storage });

/* GET ALL COURSES (not deleted) */
router.get("/", (req, res) => {
  const sql = `
    SELECT id, name, description, image, category_id, price, created_at
    FROM courses
    WHERE is_deleted = false
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* GET COURSES BY CATEGORY */
router.get("/by-category/:categoryId", (req, res) => {
  const { categoryId } = req.params;

  const sql = `
    SELECT id, name, description, image, category_id, price, created_at
    FROM courses
    WHERE is_deleted = false AND category_id = ?
  `;
  db.query(sql, [categoryId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ADD COURSE (with image upload) */
router.post("/add", upload.single("image"), (req, res) => {
  const { name, description, category_id, price } = req.body;

  if (!req.file) return res.status(400).json({ message: "Image is required" });

  const image = req.file.filename;

  const sql = `
    INSERT INTO courses (name, description, image, category_id, price)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, description, image, category_id, price], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Course added successfully", image });
  });
});

/* GET COURSE BY ID */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      c.id,
      c.name,
      c.description,
      c.image,
      c.price,
      c.created_at,
      c.category_id,
      cat.name AS category_name
    FROM courses c
    LEFT JOIN categories cat ON c.category_id = cat.id
    WHERE c.id = ? AND c.is_deleted = false
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(result[0]);
  });
});

/* EDIT COURSE (optionally replace image) */
router.put("/edit/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, description, category_id, price } = req.body;

  // If image uploaded, replace it (delete old file)
  if (req.file) {
    const newImage = req.file.filename;

    db.query(`SELECT image FROM courses WHERE id = ?`, [id], (err, rows) => {
      if (err) return res.status(500).json(err);
      if (rows.length) {
        const oldImage = rows[0].image;
        if (oldImage) {
          const oldPath = path.join(assetsDir, oldImage);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
      }

      const sql = `
        UPDATE courses
        SET name = ?, description = ?, image = ?, category_id = ?, price = ?
        WHERE id = ?
      `;
      db.query(
        sql,
        [name, description, newImage, category_id, price, id],
        (err2) => {
          if (err2) return res.status(500).json(err2);
          res.json({ message: "Course updated successfully", image: newImage });
        }
      );
    });
  } else {
    const sql = `
      UPDATE courses
      SET name = ?, description = ?, category_id = ?, price = ?
      WHERE id = ?
    `;
    db.query(sql, [name, description, category_id, price, id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Course updated successfully" });
    });
  }
});

/* SOFT DELETE COURSE */
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE courses
    SET is_deleted = true
    WHERE id = ?
  `;
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Course deleted successfully" });
  });
});

module.exports = router;
