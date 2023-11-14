const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import cors
const app = express();
const port = 3000;

app.use(express.json()); // Add this line to parse JSON data in the request body
app.use(cors()); // Use cors middleware

app.post('/send-line-notify', async (req, res) => {
  const { message, accessToken } = req.body;

  console.log(message); // Now 'message' should be defined

  try {
    const response = await axios.post(
      'https://notify-api.line.me/api/notify',
      `message=${message}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error sending Line Notify:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
