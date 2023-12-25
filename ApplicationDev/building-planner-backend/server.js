const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Defining routes here ------
const drawings = [];

app.post('/api/drawings', (req, res) => {
  const newDrawing = req.body;
  drawings.push(newDrawing);
  res.status(201).json(newDrawing);
});

app.get('/api/drawings', (req, res) => {
  res.json(drawings);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
