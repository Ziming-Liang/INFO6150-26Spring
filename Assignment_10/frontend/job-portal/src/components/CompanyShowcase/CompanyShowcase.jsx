import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Box, Alert } from '@mui/material';
import axios from 'axios';

const CompanyShowcase = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      // 获取所有用户（包含图片路径）
      const response = await axios.get('http://localhost:3000/user/getAll');
      
      // 过滤出有图片的用户
      const usersWithImages = response.data.users.filter(user => user.imagePath);
      
      // 构造图片数组
      const imageData = usersWithImages.map((user, index) => ({
        id: index + 1,
        name: user.fullName || `Company ${index + 1}`,
        imageUrl: `http://localhost:3000${user.imagePath}`
      }));

      setImages(imageData);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to load company images. Please make sure the backend server is running.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Company Showcase
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Explore companies on our platform
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {images.length === 0 && !error && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No company images available yet.
          </Typography>
        </Box>
      )}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {images.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="200"
                image={company.imageUrl}
                alt={company.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  {company.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CompanyShowcase;