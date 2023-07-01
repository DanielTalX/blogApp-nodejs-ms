const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 4002;
const event_bus_url = "http://event-bus-srv:4005"; // "http://localhost:4005"
const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  console.log(`qury - get - /posts`)
  res.send(posts);
});

app.post("/events", (req, res) => {
  console.log(`qury - post - /events`)
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});


app.listen(port, async () => {
  console.log(`query - Listening on ${port}, ${new Date().toISOString()}`);
  console.log("v1")

  try {
    const res = await axios.get(`${event_bus_url}/events`);

    for (let event of res.data) {
      console.log("Processing event:", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
