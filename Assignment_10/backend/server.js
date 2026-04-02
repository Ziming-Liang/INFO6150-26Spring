const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const jobRoutes = require('./routes/job');

const app = express();
const PORT = 3000;

// 连接 MongoDB
mongoose.connect('mongodb://localhost:27017/assignment10')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// CORS 配置
const corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:3002'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('images'));

// 路由
app.use('/user', userRoutes);
app.use('/job', jobRoutes);

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});