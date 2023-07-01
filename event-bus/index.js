const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const port = 4005;
const app = express();
app.use(bodyParser.json());

const event_bus_url = "http://event-bus-srv:4005"; // "http://localhost:4005"
const posts_url = "http://posts-srv:4000"; // "http://localhost:4000"
const comments_url = "http://comments-srv:4001"; // "http://localhost:4001"
const query_url = "http://query-srv:4002"; // "http://localhost:4002"
const moderation_url = "http://moderation-srv:4003"; // "http://localhost:4003"

const events = [];

app.post("/events", (req, res) => {
  console.log(`event-bus - post - /events`);
  const event = req.body;

  events.push(event);

  axios.post(`${posts_url}/events`, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(`${comments_url}/events`, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(`${query_url}/events`, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(`${moderation_url}/events`, event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  console.log(`event-bus - get - /events`);
  res.send(events);
});

app.listen(port, () => {
  console.log(`event-bus - Listening on ${port}, ${new Date().toISOString()}`);
  console.log("v1")
});
