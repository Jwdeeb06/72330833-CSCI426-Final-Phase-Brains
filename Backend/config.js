const mysql = require("mysql2");

console.log("📌 MySQL config file loaded");

const db = mysql.createConnection({
  host: "hopper.proxy.rlwy.net",
  user: "root",
  password: "yxweIunCLWRukNUTJximnPnxtrWTaWji",
  database: "railway",
  port: 57559,
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
