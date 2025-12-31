const express = require("express");
const router = express.Router();
const db = require("../config");
const sendAdminNotification = require("../Email/sendEmail");

/* GET REGISTRATIONS (filters: approved, course_id) */
router.get("/", (req, res) => {
  const { approved, course_id } = req.query;

  let sql = `
    SELECT 
      r.id,
      r.name,
      r.email,
      r.phone,
      r.is_approved,
      r.date,
      c.id AS course_id,
      c.name AS course_name,
      c.price AS course_price
    FROM registrations r
    LEFT JOIN courses c ON r.course_id = c.id
    WHERE 1=1
  `;

  const params = [];

  if (approved !== undefined) {
    sql += " AND r.is_approved = ?";
    params.push(approved === "true" ? 1 : 0);
  }

  if (course_id) {
    sql += " AND r.course_id = ?";
    params.push(course_id);
  }

  sql += " ORDER BY r.date DESC";

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ADD REGISTRATION (public) */
// router.post("/add", (req, res) => {
//   const { name, email, phone, course_id } = req.body;

//   const sql = `
//     INSERT INTO registrations (name, email, phone, course_id)
//     VALUES (?, ?, ?, ?)
//   `;

//   db.query(sql, [name, email, phone, course_id], (err) => {
//     if (err) return res.status(500).json(err);
//     res.json({ message: "Registration submitted successfully" });
//   });
// });

// for email
router.post("/add", (req, res) => {
  const { name, email, phone, course_id } = req.body;

  const sql = `
    INSERT INTO registrations (name, email, phone, course_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, phone, course_id], (err) => {
    if (err) return res.status(500).json(err);

    // Get course name for email
    db.query(
      "SELECT name FROM courses WHERE id = ?",
      [course_id],
      async (err2, result) => {
        if (!err2 && result.length) {
          try {
            await sendAdminNotification({
              name,
              email,
              phone,
              courseName: result[0].name,
            });
          } catch (emailErr) {
            console.error("Email failed:", emailErr.message);
          }
        }
      }
    );

    // Respond immediately (don’t wait for email)
    res.json({ message: "Registration submitted successfully" });
  });
});

/* APPROVE REGISTRATION */
router.put("/approve/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE registrations
    SET is_approved = true
    WHERE id = ?
  `;

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Registration approved" });
  });
});

/* DELETE REGISTRATION (hard delete) */
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM registrations WHERE id = ?`;

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Registration deleted" });
  });
});

/* GET REGISTRATION BY ID */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      r.id,
      r.name,
      r.email,
      r.phone,
      r.is_approved,
      r.date,
      c.id AS course_id,
      c.name AS course_name,
      c.description,
      c.price
    FROM registrations r
    LEFT JOIN courses c ON r.course_id = c.id
    WHERE r.id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json(result[0]);
  });
});

module.exports = router;
