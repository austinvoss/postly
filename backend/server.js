require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT || 3001;

const authenticateJWT = require("./authMiddleware");

app.use(express.json()); // To parse JSON bodies

// Uncomment when you want to use this
// app.get("/some-secure-route", authenticateJWT, (req, res) => {
//   // Your secure logic here
// });

app.get("/", (req, res) => {
  res.send("Hello, Postly!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const db = require("./dbconfig");

// Add a new post
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

// Update a post
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

// Delete a post
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
  try {
    const { email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10); // Encrypt the password
    await db.none("INSERT INTO users (email, password) VALUES ($1, $2)", [
      email,
      encryptedPassword,
    ]);
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// User login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.one("SELECT * FROM users WHERE email = $1", [email]);
    const match = await bcrypt.compare(password, user.password); // Compare encrypted password

    if (match) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY); // Generate JWT
      res.json({ message: "User logged in successfully", token });
    } else {
      res.json({ message: "Invalid password" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Send a message
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

// Get all messages for a post
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

// Get all messages received by a user
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
