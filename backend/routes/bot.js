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

// POST /api/bot/action
router.post('/action', auth, (req, res) => {
  const { action, target, comment } = req.body;
  if (!['like', 'comment', 'follow'].includes(action)) {
    return res.status(400).json({ message: 'Invalid action' });
  }
  // Mock response
  res.json({
    message: `Bot performed '${action}'${target ? ' on ' + target : ''}${comment ? ' with comment: ' + comment : ''}`,
    success: true,
  });
});

module.exports = router; 