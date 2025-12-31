const mysql = require("mysql");

console.log("📌 MySQL config file loaded");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "brains",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:");
    console.error(err); // 👈 FULL ERROR
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

module.exports = db;
