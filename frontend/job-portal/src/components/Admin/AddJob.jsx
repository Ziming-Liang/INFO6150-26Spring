import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert
} from '@mui/material';

const AddJob = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    description: '',
    salary: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3000/job/create', formData);
      setSuccess('Job created successfully!');
      // 清空表单
      setFormData({
        companyName: '',
        jobTitle: '',
        description: '',
        salary: ''
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create job');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Job
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Job
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddJob;