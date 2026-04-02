import React, { useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Alert } from '@mui/material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // 这里只是前端展示，实际不发送到后端
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Contact Us
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Typography variant="body1" paragraph>
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Thank you for your message! We'll get back to you soon.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            multiline
            rows={4}
            margin="normal"
          />
          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            sx={{ mt: 2 }}
          >
            Send Message
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Contact;