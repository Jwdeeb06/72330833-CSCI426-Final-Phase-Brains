const express = require("express");
const router = express.Router();
const db = require("../config");

/* GET MESSAGES (filter by read/unread) */
router.get("/", (req, res) => {
  const { readed } = req.query;

  let sql = `
    SELECT id, name, email, content, date, is_readed
    FROM messages
    WHERE 1=1
  `;
  const params = [];

  if (readed !== undefined) {
    sql += " AND is_readed = ?";
    params.push(readed === "true" ? 1 : 0);
  }

  sql += " ORDER BY date DESC";

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ADD MESSAGE (public) */
router.post("/add", (req, res) => {
  const { name, email, content } = req.body;

  const sql = `
    INSERT INTO messages (name, email, content)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [name, email, content], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Message sent successfully" });
  });
});

/* MARK MESSAGE AS READ */
router.put("/read/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE messages
    SET is_readed = true
    WHERE id = ?
  `;

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Message marked as read" });
  });
});

/* GET MESSAGE BY ID */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT id, name, email, content, date, is_readed
    FROM messages
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json(result[0]);
  });
});

/* DELETE MESSAGE (hard delete) */
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM messages WHERE id = ?`;

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Message deleted" });
  });
});

module.exports = router;
