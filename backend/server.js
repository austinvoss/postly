const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello, Postly!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const db = require("./dbconfig");

app.post("/add-post", async (req, res) => {
  try {
    const { title, content } = req.body;
    const result = await db.none(
      "INSERT INTO posts (title, content) VALUES ($1, $2)",
      [title, content]
    );
    res.json({ message: "Post added successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { title, content } = req.body;
    await db.none("INSERT INTO posts (title, content) VALUES ($1, $2)", [
      title,
      content,
    ]);
    res.json({ message: "Post added successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.patch("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    await db.none("UPDATE posts SET title = $1, content = $2 WHERE id = $3", [
      title,
      content,
      id,
    ]);
    res.json({ message: "Post updated successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.none("DELETE FROM posts WHERE id = $1", [id]);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Register a new user
app.post("/register", async (req, res) => {
  // My registration logic here
  res.json({ message: "User registered successfully" });
});

// User login
app.post("/login", async (req, res) => {
  // My login logic here
  res.json({ message: "User logged in successfully" });
});

app.post("/messages", async (req, res) => {
  try {
    const { sender, recipient, postId, content } = req.body;
    await db.none(
      "INSERT INTO messages (sender, recipient, post_id, content) VALUES ($1, $2, $3, $4)",
      [sender, recipient, postId, content]
    );
    res.json({ message: "Message sent successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/messages/post/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const messages = await db.any("SELECT * FROM messages WHERE post_id = $1", [
      postId,
    ]);
    res.json(messages);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get("/messages/received/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await db.any(
      "SELECT * FROM messages WHERE recipient = $1",
      [userId]
    );
    res.json(messages);
  } catch (error) {
    res.json({ error: error.message });
  }
});
