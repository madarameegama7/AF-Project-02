import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import swal from 'sweetalert';
import { Box, Button, TextField, Typography, Link, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import loginBackground from '../assets/images/explore.webp';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          swal("Error", "Passwords do not match", "error");
          return;
        }
        if (!email || !password || (isSignUp && !confirmPassword)) {
          swal("Error", "All fields are required.", "error");
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        sessionStorage.setItem('user', JSON.stringify(user));
        swal("Success", "User signed up successfully!", "success");
        navigate('/home');

      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        sessionStorage.setItem('user', JSON.stringify(user)); // Store user data in session storage
        swal("Success", "User logged in successfully!", "success");
        navigate('/home');
      }
    } catch (error) {
      swal("Error", "Authentication failed. Please try again.", "error");
    }
  };

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    sx={{
      position: 'relative',
      backgroundImage: `url(${loginBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1, 
      }}
    />
  
    {/* Content */}
    <Box
      sx={{
        position: 'relative',
        zIndex: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        {/* Title */}
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </Typography>
        <Typography variant="body2" align="center" sx={{ marginBottom: 3 }}>
          {isSignUp ? 'Sign up to explore more!' : 'Log in to continue.'}
        </Typography>
  
        <Divider sx={{ marginY: 2 }}>OR</Divider>
  
        {/* Email and Password Fields */}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        {isSignUp && (
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
  
        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAuth}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </Button>
  
        {/* Toggle Between Login and Signup */}
        <Link
          component="button"
          variant="body2"
          onClick={() => setIsSignUp(!isSignUp)}
          sx={{ marginTop: 2, display: 'block', textAlign: 'center' }}
        >
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </Link>
      </Paper>
    </Box>
  </Box>
  );
};

export default LoginPage;