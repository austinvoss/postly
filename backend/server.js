const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello, Postly!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const db = require("./dbConfig");

app.get("/test-db", async (req, res) => {
  try {
    const data = await db.any("SELECT * FROM posts"); // Updated table name to 'posts'
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
});
