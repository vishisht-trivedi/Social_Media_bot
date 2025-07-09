const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

function auth(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Mock trends endpoint
router.get('/', auth, (req, res) => {
  res.json({
    trends: [
      '#NodeJS',
      '#React',
      '#100DaysOfCode',
      '#WebDevelopment',
      '#OpenAI',
      '#JavaScript',
      '#Coding',
      '#Tech',
    ].sort(() => 0.5 - Math.random()).slice(0, 5),
  });
});

module.exports = router; 