const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 4001;
const event_bus_url = "http://event-bus-srv:4005"; // "http://localhost:4005"
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  console.log(`comments - get - /posts/:id/comments - ${req.params.id}`);
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  console.log(`comments - post - /posts/:id/comments - ${req.params.id}`);
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[req.params.id] = comments;

  await axios.post(`${event_bus_url}/events`, {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("comments - /events - Event Received:", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post(`${event_bus_url}/events`, {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});

app.listen(port, () => {
  console.log(`comments - Listening on ${port}, ${new Date().toISOString()}`);
  console.log(`v1`)
});
