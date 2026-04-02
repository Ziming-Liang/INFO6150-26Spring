const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// 创建职位
router.post('/create', async (req, res) => {
  try {
    const { companyName, jobTitle, description, salary } = req.body;

    if (!companyName || !jobTitle || !description || !salary) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newJob = new Job({
      companyName,
      jobTitle,
      description,
      salary
    });

    await newJob.save();
    res.status(201).json({ 
      message: "Job created successfully.",
      job: newJob
    });

  } catch (error) {
    res.status(400).json({ error: "Failed to create job." });
  }
});

// 获取所有职位
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve jobs." });
  }
});

module.exports = router;