const express = require("express");
const router = express.Router();
const db = require("../config");

/* GET ALL USERS (not deleted / active) */
router.get("/", (req, res) => {
  const sql = `
    SELECT id, username, password, is_active, created_at
    FROM users
    WHERE is_active = true
    `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* GET ALL USERS ( deleted / inactive) */
router.get("/in", (req, res) => {
  const sql = `
    SELECT id, username, password, is_active, created_at
    FROM users
    WHERE is_active = false
    `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ADD USER */
router.post("/add", (req, res) => {
  const { username, password } = req.body;

  const sql = `
    INSERT INTO users (username, password)
    VALUES (?, ?)
  `;

  db.query(sql, [username, password], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User added successfully" });
  });
});

/* GET USER BY ID */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT id, username, is_active, created_at
    FROM users
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result[0]);
  });
});

/* EDIT USER */
router.put("/edit/:id", (req, res) => {
  const { username, is_active } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE users
    SET username = ?, is_active = ?
    WHERE id = ?
  `;

  db.query(sql, [username, is_active, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User updated successfully" });
  });
});

router.put("/toggle/:id", (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body;

  const sql = `
    UPDATE users
    SET is_active = ?
    WHERE id = ?
  `;

  db.query(sql, [is_active, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User status updated" });
  });
});

/* LOGIN */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = `
    SELECT id, username
    FROM users
    WHERE username = ?
      AND password = ?
      AND is_active = true
    LIMIT 1
  `;

  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: result[0],
    });
  });
});

module.exports = router;
