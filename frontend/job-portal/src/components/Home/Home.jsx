import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>
          Welcome to Job Portal, {user?.fullName}!
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Find your dream job today
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="body1" paragraph>
            Explore thousands of job opportunities with all the information you need.
            Its your future. Come find it. Manage all your job applications from start to finish.
          </Typography>
          
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              to="/jobs"
            >
              Browse Jobs
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              component={Link} 
              to="/companies"
            >
              View Companies
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
