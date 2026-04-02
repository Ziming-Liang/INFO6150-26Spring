import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from './redux/userSlice';

import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';

// Admin 组件
import EmployeeList from './components/Admin/EmployeeList';
import AddJob from './components/Admin/AddJob';

// Employee 组件
import JobList from './components/Employee/JobList';

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

// 路由保护组件
const ProtectedRoute = ({ children, allowedType }) => {
  const { isLoggedIn, userType } = useSelector((state) => state.user);
  
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  
  if (allowedType && userType !== allowedType) {
    return <Navigate to="/" />;
  }
  
  return children;
};

// 根据角色重定向
const RedirectByRole = () => {
  const { userType } = useSelector((state) => state.user);
  
  if (userType === 'admin') {
    return <Navigate to="/admin/employees" />;
  } else {
    return <Navigate to="/employee/jobs" />;
  }
};

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    // 从 localStorage 加载用户信息
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(loadUser(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={isLoggedIn ? <RedirectByRole /> : <Login />} 
          />

          {/* Admin 路由 */}
          <Route
            path="/admin/employees"
            element={
              <ProtectedRoute allowedType="admin">
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-job"
            element={
              <ProtectedRoute allowedType="admin">
                <AddJob />
              </ProtectedRoute>
            }
          />

          {/* Employee 路由 */}
          <Route
            path="/employee/jobs"
            element={
              <ProtectedRoute allowedType="employee">
                <JobList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;