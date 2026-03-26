import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        About Us
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          We connect talented professionals with outstanding career opportunities.
          Our platform makes job searching simple, efficient, and effective.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          What We Do
        </Typography>
        <Typography variant="body1" paragraph>
          - Provide comprehensive job listings across various industries
        </Typography>
        <Typography variant="body1" paragraph>
          - Connect job seekers with top companies
        </Typography>
        <Typography variant="body1" paragraph>
          - Offer career resources and guidance
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Our Values
        </Typography>
        <Typography variant="body1" paragraph>
          We believe in transparency, equality, and empowering individuals to
          find meaningful work that aligns with their skills and passions.
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;