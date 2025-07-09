const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const analyticsRoutes = require('./routes/analytics');
const trendsRoutes = require('./routes/trends');
const botRoutes = require('./routes/bot');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/trends', trendsRoutes);
app.use('/api/bot', botRoutes);

connectDB();

app.get('/', (req, res) => {
  res.send('Social Media Bot Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 