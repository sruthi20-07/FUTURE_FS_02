const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("✅ MySQL Connected");
});

// Test Route
app.get("/", (req, res) => {
  res.send("Mini CRM Backend Running...");
});


// ➕ Add Lead
app.post("/api/leads", (req, res) => {
  const { name, email, source, status, notes } = req.body;

  const sql =
    "INSERT INTO leads (name, email, source, status, notes) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [name, email, source, status, notes],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add lead" });
        return;
      }

      res.json({ message: "Lead added", id: result.insertId });
    }
  );
});


// 📄 Get All Leads
app.get("/api/leads", (req, res) => {
  db.query(
    "SELECT * FROM leads ORDER BY created_at DESC",
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch leads" });
        return;
      }

      res.json(results);
    }
  );
});


// ✏️ Update Lead Status
app.put("/api/leads/:id", (req, res) => {
  const { status, notes } = req.body;
  const id = req.params.id;

  const sql =
    "UPDATE leads SET status = ?, notes = ? WHERE id = ?";

  db.query(sql, [status, notes, id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update lead" });
      return;
    }

    res.json({ message: "Lead updated" });
  });
});


// ❌ Delete Lead (Optional)
app.delete("/api/leads/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM leads WHERE id = ?", [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete lead" });
      return;
    }

    res.json({ message: "Lead deleted" });
  });
});


// Start Server
const PORT = process.env.PORT || 5000;
// ================= ADMIN AUTH =================

// Register
app.post("/api/register", async (req, res) => {

  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const sql =
    "INSERT INTO admins (username, password) VALUES (?, ?)";

  db.query(sql, [username, hashed], (err) => {

    if (err) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    res.json({ message: "Registered successfully" });
  });
});


// Login
app.post("/api/login", (req, res) => {

  const { username, password } = req.body;

  const sql =
    "SELECT * FROM admins WHERE username = ?";

  db.query(sql, [username], async (err, result) => {

    if (err || result.length === 0) {
      res.status(401).json({ error: "Invalid username" });
      return;
    }

    const admin = result[0];

    const match = await bcrypt.compare(
      password,
      admin.password
    );

    if (!match) {
      res.status(401).json({ error: "Wrong password" });
      return;
    }

    res.json({ message: "Login success" });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
