const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const event_bus_url = "http://event-bus-srv:4005"; // "http://localhost:4005"
const posts_url = "http://posts-srv:4000"; // "http://localhost:4000"
const comments_url = "http://comments-srv:4001"; // "http://localhost:4001"
const query_url = "http://query-srv:4002"; // "http://localhost:4002"
const moderation_url = "http://moderation-srv:4002"; // "http://localhost:4003"

const events = [];

app.post("/events", (req, res) => {
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
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
