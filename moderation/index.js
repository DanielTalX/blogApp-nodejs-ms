const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const port = 4003;
const app = express();
app.use(bodyParser.json());

const event_bus_url = "http://event-bus-srv:4005"; // "http://localhost:4005"

app.post('/events', async (req, res) => {
  console.log(`moderation - post - /events`);
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post(`${event_bus_url}/events`, {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    });
  }

  res.send({});
});

app.listen(port, () => {
  console.log(`moderation - Listening on ${port}, ${new Date().toISOString()}`);
  console.log("v1")
});
