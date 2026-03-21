const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3000;

app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'secret',
  database: process.env.DB_NAME || 'docker_lab',
  waitForConnections: true,
});

app.get("/api/health", async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: "ok", container: require("os").hostname() });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

app.get("/api/items", async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM items');
  res.json(rows);
});

app.post("/api/items", async (req, res) => {
  const { name, description } = req.body;
  const [result] = await pool.query(
    'INSERT INTO items (name, description) VALUES (?, ?)',
    [name, description]
  );
  res.status(201).json({ id: result.insertId, name, description });
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));