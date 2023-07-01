const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 4000;
const event_bus_url = "http://event-bus-srv:4005"; // "http://localhost:4005"
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  console.log("posts - post - /posts/create");
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  await axios.post(`${event_bus_url}/events`, {
    type: "PostCreated",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("posts - post - /events - Received Event", req.body.type);
  res.send({});
});

app.listen(port, () => {
  console.log(`posts - Listening on ${port}, ${new Date().toISOString()}`);
  console.log("v1")
});
