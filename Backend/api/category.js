const express = require("express");
const router = express.Router();
const db = require("../config");

/* GET ALL CATEGORIES (not deleted) */
router.get("/", (req, res) => {
  const sql = `
    SELECT id, name, created_at
    FROM categories
    WHERE is_deleted = false
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ADD CATEGORY */
router.post("/add", (req, res) => {
  const { name } = req.body;

  const sql = `
    INSERT INTO categories (name)
    VALUES (?)
  `;

  db.query(sql, [name], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Category added successfully" });
  });
});

/* GET CATEGORY BY ID */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT id, name, created_at
    FROM categories
    WHERE id = ? AND is_deleted = false
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(result[0]);
  });
});

/* EDIT CATEGORY */
router.put("/edit/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE categories
    SET name = ?
    WHERE id = ?
  `;

  db.query(sql, [name, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Category updated successfully" });
  });
});

/* SOFT DELETE CATEGORY */
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE categories
    SET is_deleted = true
    WHERE id = ?
  `;

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Category deleted successfully" });
  });
});

module.exports = router;
