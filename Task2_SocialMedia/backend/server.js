const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = "./data.json";

// helper to read data
function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

// helper to write data
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

/* -------- USERS -------- */
app.post("/login", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).send("Username required");

  let data = readData();
  if (!data.users.includes(username)) {
    data.users.push(username);
    writeData(data);
  }

  res.send({ message: "Login successful", user: username });
});

/* -------- POSTS -------- */
app.post("/post", (req, res) => {
  const { user, text } = req.body;
  if (!user || !text) return res.status(400).send("Invalid post");

  let data = readData();
  data.posts.unshift({
    id: Date.now(),
    user,
    text,
    likes: 0,
    comments: []
  });

  writeData(data);
  res.send({ message: "Post created" });
});

app.get("/posts", (req, res) => {
  const data = readData();
  res.send(data.posts);
});

/* -------- LIKES -------- */
app.post("/like/:id", (req, res) => {
  let data = readData();
  let post = data.posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).send("Post not found");

  post.likes++;
  writeData(data);
  res.send({ likes: post.likes });
});

/* -------- COMMENTS -------- */
app.post("/comment/:id", (req, res) => {
  const { text } = req.body;
  let data = readData();
  let post = data.posts.find(p => p.id == req.params.id);

  if (!post) return res.status(404).send("Post not found");
  post.comments.push(text);

  writeData(data);
  res.send({ message: "Comment added" });
});

/* -------- SERVER -------- */
app.listen(3000, () => {
  console.log("Social Media backend running on port 3000");
});
