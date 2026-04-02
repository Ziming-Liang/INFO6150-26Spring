import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Alert
} from '@mui/material';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/job');
      setJobs(response.data.jobs);
    } catch (err) {
      setError('Failed to fetch jobs');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Jobs
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {jobs.length === 0 && !error && (
        <Alert severity="info" sx={{ mb: 2 }}>
          No jobs available at the moment.
        </Alert>
      )}

      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} key={job._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {job.jobTitle}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {job.companyName}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
                  {job.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  Salary: {job.salary}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Posted: {new Date(job.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobList;