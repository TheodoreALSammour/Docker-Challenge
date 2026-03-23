const express = require("express");
const mysql = require("mysql2/promise");
const os = require("os");

const app = express();
const PORT = 3000;

app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "secret",
  database: process.env.DB_NAME || "books_lab",
  waitForConnections: true,
});

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", container: os.hostname() });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

app.get("/api/books", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM books");
  res.json(rows);
});

app.post("/api/books", async (req, res) => {
  const { title, author } = req.body;
  const [result] = await pool.query(
    "INSERT INTO books (title, author) VALUES (?, ?)",
    [title, author]
  );
  res.status(201).json({ id: result.insertId, title, author });
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});