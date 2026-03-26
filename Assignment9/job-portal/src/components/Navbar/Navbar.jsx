import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <WorkIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Job Portal
          </Typography>
          
          {isLoggedIn && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" component={Link} to="/home">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/about">
                About
              </Button>
              <Button color="inherit" component={Link} to="/jobs">
                Job Listings
              </Button>
              <Button color="inherit" component={Link} to="/companies">
                Companies
              </Button>
              <Button color="inherit" component={Link} to="/contact">
                Contact
              </Button>
              <Button 
                color="inherit" 
                onClick={handleLogout}
                sx={{ 
                  ml: 2, 
                  border: '1px solid white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;