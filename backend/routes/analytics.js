const express = require('express');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

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

// Mock analytics endpoint
router.get('/', auth, (req, res) => {
  res.json({
    followers: 123 + Math.floor(Math.random() * 100),
    engagement: Math.floor(Math.random() * 1000),
    postCount: 10 + Math.floor(Math.random() * 10),
    growth: (Math.random() * 10).toFixed(2),
  });
});

// Get all posts for analytics/scraping
router.get('/posts', auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 