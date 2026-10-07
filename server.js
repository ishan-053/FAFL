const express = require('express');
const path = require('path');
const { validate } = require('./validate');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/validate', (req, res) => {
  const name = String(req.body.name ?? '');
  res.json({ name, ...validate(name) });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`File Name Validator running at http://localhost:${PORT}`));
