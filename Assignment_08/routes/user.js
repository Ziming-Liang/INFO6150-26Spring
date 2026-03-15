const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const User = require('../models/Users');

// 配置 multer 文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file format. Only JPEG, PNG, and GIF are allowed.'));
    }
  }
});


// 创建用户
router.post('/create', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Validation failed." });
    }

    // 验证全名
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(fullName)) {
      return res.status(400).json({ error: "Validation failed." });
    }

    // 验证密码强度
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: "Validation failed." });
    }

    //bcrypt 加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully." });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Validation failed." });
    }
    res.status(400).json({ error: "Validation failed." });
  }
});


//更新用户
router.put('/edit', async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    // 检查用户是否存在
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // 验证全名
    if (fullName) {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(fullName)) {
        return res.status(400).json({ error: "Validation failed." });
      }
      user.fullName = fullName;
    }

    // 验证密码
    if (password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: "Validation failed." });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully." });

  } catch (error) {
    res.status(400).json({ error: "Validation failed." });
  }
});

// 删除用户
router.delete('/delete', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOneAndDelete({ email });
    
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });

  } catch (error) {
    res.status(400).json({ error: "Validation failed." });
  }
});

// 获取所有用户
router.get('/getAll', async (req, res) => {
  try {
    const users = await User.find({}, 'fullName email password');
    
    const userList = users.map(user => ({
      fullName: user.fullName,
      email: user.email,
      password: user.password
    }));

    res.status(200).json({ users: userList });

  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve users." });
  }
});

// 上传图片
router.post('/uploadImage', upload.single('image'), async (req, res) => {
  try {
    const { email } = req.body;

    // 用户存在？
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // 已上传？
    if (user.imagePath) {
      return res.status(400).json({ error: "Image already exists for this user." });
    }

    // 检查是否有文件上传
    if (!req.file) {
      return res.status(400).json({ error: "Invalid file format. Only JPEG, PNG, and GIF are allowed." });
    }

    // 保存图片路径
    const filePath = '/images/' + req.file.filename;
    user.imagePath = filePath;
    await user.save();

    res.status(201).json({ 
      message: "Image uploaded successfully.", 
      filePath: filePath 
    });

  } catch (error) {
    if (error.message === 'Invalid file format. Only JPEG, PNG, and GIF are allowed.') {
      return res.status(400).json({ error: error.message });
    }
    res.status(400).json({ error: "Upload failed." });
  }
});

module.exports = router;