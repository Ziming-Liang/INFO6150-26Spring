import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import About from './components/About/About';
import JobListings from './components/JobListings/JobListings';
import Contact from './components/Contact/Contact';
import CompanyShowcase from './components/CompanyShowcase/CompanyShowcase';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 检查 localStorage 是否有用户信息
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route 
            path="/" 
            element={
              isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />
            } 
          />
          <Route 
            path="/home" 
            element={isLoggedIn ? <Home /> : <Navigate to="/" />} 
          />
          <Route 
            path="/about" 
            element={isLoggedIn ? <About /> : <Navigate to="/" />} 
          />
          <Route 
            path="/jobs" 
            element={isLoggedIn ? <JobListings /> : <Navigate to="/" />} 
          />
          <Route 
            path="/companies" 
            element={isLoggedIn ? <CompanyShowcase /> : <Navigate to="/" />} 
          />
          <Route 
            path="/contact" 
            element={isLoggedIn ? <Contact /> : <Navigate to="/" />} 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;