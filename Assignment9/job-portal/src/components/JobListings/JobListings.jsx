import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Chip, Box } from '@mui/material';
import { jobPosts } from '../../data/jobPosts';

const JobListings = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Job Listings
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Explore our latest job opportunities
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {jobPosts.map((job) => (
          <Grid item xs={12} md={6} key={job.id}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {job.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip label={job.lastUpdated} size="small" color="primary" variant="outlined" />
                </Box>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  variant="contained" 
                  href={job.applyLink}
                  target="_blank"
                >
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobListings;